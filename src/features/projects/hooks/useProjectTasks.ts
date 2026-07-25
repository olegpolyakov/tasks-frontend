import { useCallback } from 'react';

import type { ProjectData, Task, TaskData } from '@olegpolyakov/tasks-core';

import { toRecord } from '@/common/utils';
import { useTasksApi, useTasksContext } from '@/features/tasks';
import { getAllChildren } from '@/features/tasks/logic/children';

import useProjectsApi from './useProjectsApi';

export default function useProjectTasks(project: ProjectData | null) {
    const api = useProjectsApi();
    const tasksApi = useTasksApi();
    const { tasks } = useTasksContext();

    const addTask = useCallback(async (data: Partial<TaskData>, sectionId?: string) => {
        if (!project) return;
        
        const task = await tasksApi.createTask(data);
        
        if (sectionId) {
            const section = project.sectionData[sectionId];

            if (!section) throw new Error('Section not found');

            await api.updateSection(project.id, sectionId, {
                ...section,
                taskIds: [...section.taskIds, task.id]
            });
        } else {
            await api.updateProject(project.id, { 
                taskIds: [...project.taskIds, task.id]
            });
        }

        return task;
    }, [project, api, tasksApi]);

    const removeTask = useCallback(async (taskId: string, sectionId?: string) => {
        await tasksApi.deleteTask(taskId);

        if (sectionId) {
            const section = project?.sectionData[sectionId];

            if (!section) return;

            await api.updateSection(project.id, sectionId, {
                taskIds: section.taskIds.filter(id => id !== taskId)
            });
        }
    }, [project, api, tasksApi]);

    const projectTasks = project?.taskIds
        .map(id => tasks[id])
        .filter(Boolean)
        .flatMap(task => [
            task,
            ...getAllChildren(task.id, tasks).flat()
        ])
        .filter(Boolean) as Task[] ?? [];

    return {
        tasks: projectTasks,
        addTask,
        removeTask
    };
}