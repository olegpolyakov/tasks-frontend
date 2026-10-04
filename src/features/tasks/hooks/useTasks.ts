import { useCallback, useMemo } from 'react';

import { Task, TaskData } from '@olegpolyakov/tasks-core';
import { toRecordById } from '@olegpolyakov/core/utils/types';

import { getAllChildren } from '../logic/children';

import useTasksApi from './useTasksApi';
import useTasksState from './useTasksState';

export default function useTasks() {
    const api = useTasksApi();
    const tasks = useTasksState(api);
    
    const tasksById = useMemo(() => toRecordById(tasks), [tasks]);

    const createTask = useCallback(async (data: Partial<TaskData>) => {
        return api.createTask(data) as Promise<Task>;
    }, [api]);

    const updateTask = useCallback(async (id: string, data: Partial<Task>) => {
        return api.updateTask(id, data) as Promise<Task>;
    }, [api]);

    const toggleTask = useCallback(async (id: string, completed: boolean) => {
        if (!completed) {
            return api.toggleTask(id, false) as Promise<Task>;
        }

        const task = tasksById[id];
        const incompleteChildren = getAllChildren(id, tasksById, t => !t.completed);

        if (incompleteChildren.length > 0) {
            if (!confirm(`Completing this task will also mark ${incompleteChildren.length} sub-tasks complete. Are you sure?`)) {
                return task;
            }
        }

        const [completedTask] = await Promise.all(
            [task, ...incompleteChildren].map(t => api.toggleTask(t.id, true))
        );

        return completedTask as Task;
    }, [api, tasksById]);

    const deleteTask = useCallback(async (id: string) => {
        const task = tasksById[id];
        const children = getAllChildren(id, tasksById);
        const message = children.length > 0
            ? `Deleting this task will also delete ${children.length} sub-tasks. Are you sure?`
            : 'Are you sure you want to delete this task?';

        if (!confirm(message)) return;

        await Promise.all(
            [task, ...children].map(t => api.deleteTask(t.id))
        );
    }, [api, tasksById]);

    return {
        tasks,
        tasksById,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    };
}