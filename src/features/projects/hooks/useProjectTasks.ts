import { useCallback, useMemo } from 'react';

import type { ProjectData, TaskData } from '@olegpolyakov/tasks-core';

import { useTasksApi, useTasksContext } from '@/features/tasks';
import { getAllChildren } from '@/features/tasks/logic/children';

import useProjectsApi from './useProjectsApi';

export default function useProjectTasks(project: ProjectData | null) {
    const api = useProjectsApi();
    const tasksApi = useTasksApi();
    const { tasksById } = useTasksContext();

    const tasks = useMemo(() => {
        return project?.taskIds
            .map(id => tasksById[id])
            .filter(Boolean)
            .flatMap(task => [
                task,
                ...getAllChildren(task.id, tasksById).flat()
            ])
            .filter(Boolean) ?? [];
    }, [project?.taskIds, tasksById]);

    const addTask = useCallback(async (data: Partial<TaskData>, sectionId?: string) => {
        if (!project) throw new Error('No project');
        
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

    return {
        tasks,
        addTask,
        removeTask
    };
}