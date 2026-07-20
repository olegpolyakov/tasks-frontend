import { useCallback, useEffect, useState } from 'react';

import type { Project, Task, TaskData } from '@olegpolyakov/tasks-core';

import { useTasksApi } from '@/features/tasks';

import useProjectsApi from './useProjectsApi';

export default function useProjectTasks(project: Project) {
    const api = useProjectsApi();
    const tasksApi = useTasksApi();

    const projectId = project.id;

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        api.fetchProjectTasks(projectId).then(setTasks);
    }, [projectId, api]);

    const addTask = useCallback(async (data: Partial<TaskData>, sectionId?: string) => {
        if (!project) return;

        if (data.projectIds && !data.projectIds.includes(project.id)) {
            data.projectIds.push(project.id);
        } else if (!data.projectIds) {
            data.projectIds = [project.id];
        }
        
        if (sectionId && !(sectionId in project.sectionData)) {
            throw new Error('Section not found');
        }

        const newTask = await tasksApi.createTask(data);
        
        if (sectionId) {
            const section = project.sectionData[sectionId];

            if (!section) return;

            await api.updateSection(project.id, sectionId, {
                ...section,
                taskIds: [...section.taskIds, newTask.id]
            });
        }

        setTasks(tasks => [...tasks, newTask]);
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

        setTasks(tasks => tasks.filter(task => task.id !== taskId));
    }, [project, api, tasksApi]);

    return {
        tasks,
        addTask,
        removeTask
    };
}