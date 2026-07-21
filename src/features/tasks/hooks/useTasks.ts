import { useCallback, useEffect } from 'react';

import { Task } from '@olegpolyakov/tasks-core';

import { toRecord } from '@/utils';

import { getAllChildren } from '../logic/children';
import { useTasksState } from '../state';

import useTasksApi from './useTasksApi';

export default function useTasks() {
    const api = useTasksApi();
    const [tasks, setTasks] = useTasksState();

    useEffect(() => {
        api.fetchTasks().then(tasks => {
            setTasks(tasks);
        });
    }, [api, setTasks]);

    const createTask = useCallback(async (data: Partial<Task>) => {
        return api.createTask(data);
    }, [api]);

    const updateTask = useCallback(async (id: string, data: Partial<Task>) => {
        return api.updateTask(id, data);
    }, [api]);

    const toggleTask = useCallback(async (id: string, completed: boolean) => {
        const tasksRecord = toRecord(tasks);
        const task = tasksRecord[id];
        const incompleteTasks = getAllChildren(id, tasksRecord, t => !t.completed);

        if (
            completed &&
            incompleteTasks.length > 0
        ) {
            if (!confirm(`Completing this task will also mark ${incompleteTasks.length} complete. Are you sure?`)) {
                return;
            }

            const [completedTask] = await Promise.all([task, ...incompleteTasks].map(task => api.toggleTask(task.id, true)));

            return completedTask;
        } else {
            return api.toggleTask(id, completed);
        }
    }, [api, tasks]);

    const deleteTask = useCallback(async (id: string) => {       
        const tasksRecord = toRecord(tasks);
        const task = tasksRecord[id];
        const children = getAllChildren(id, tasksRecord);

        if (children.length > 0) {
            if (!confirm(`Deleting this task will also delete ${children.length} sub-tasks. Are you sure?`)) {
                return;
            }

            const [deletedTask] = await Promise.all([task, ...children].map(async task => {
                await api.deleteTask(task.id);
                return task;
            }));

            return deletedTask;
        } else {
            if (!confirm('Are you sure you want to delete this task?')) {
                return;
            }

            await api.deleteTask(id);
        }
    }, [api, tasks]);

    return {
        tasks,
        setTasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    };
}