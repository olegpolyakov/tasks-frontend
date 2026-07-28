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
        const task = tasksById[id];
        const incompleteTasks = getAllChildren(id, tasksById, t => !t.completed);

        if (
            completed &&
            incompleteTasks.length > 0
        ) {
            if (!confirm(`Completing this task will also mark ${incompleteTasks.length} complete. Are you sure?`)) {
                return task as Task;
            }

            const [completedTask] = await Promise.all([task, ...incompleteTasks].map(task => api.toggleTask(task.id, true)));

            return completedTask as Task;
        } else {
            return api.toggleTask(id, completed) as Promise<Task>;
        }
    }, [api, tasksById]);

    const deleteTask = useCallback(async (id: string) => {       
        const task = tasksById[id];
        const children = getAllChildren(id, tasksById);

        if (children.length > 0) {
            if (!confirm(`Deleting this task will also delete ${children.length} sub-tasks. Are you sure?`)) {
                return;
            }

            await Promise.all(
                [task, ...children].map(task => api.deleteTask(task.id))
            );
        } else {
            if (!confirm('Are you sure you want to delete this task?')) {
                return;
            }

            await api.deleteTask(id);
        }
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