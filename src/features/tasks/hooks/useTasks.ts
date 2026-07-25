import { useCallback, useEffect } from 'react';

import { Task, TaskData } from '@olegpolyakov/tasks-core';

import { toRecord } from '@/common/utils';

import { getAllChildren } from '../logic/children';
import { useTasksState } from '../state';

import useTasksApi from './useTasksApi';

export default function useTasks() {
    const api = useTasksApi();
    const [tasks, setTasks] = useTasksState(api.events);

    useEffect(() => {
        api.fetchTasks().then(tasks => {
            setTasks(toRecord(tasks));
        });
    }, [api, setTasks]);

    const createTask = useCallback(async (data: Partial<TaskData>) => {
        return api.createTask(data) as Promise<Task>;
    }, [api]);

    const updateTask = useCallback(async (id: string, data: Partial<Task>) => {
        return api.updateTask(id, data) as Promise<Task>;
    }, [api]);

    const toggleTask = useCallback(async (id: string, completed: boolean) => {
        const task = tasks[id];
        const incompleteTasks = getAllChildren(id, tasks, t => !t.completed);

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
    }, [api, tasks]);

    const deleteTask = useCallback(async (id: string) => {       
        const task = tasks[id];
        const children = getAllChildren(id, tasks);

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
    }, [api, tasks]);

    return {
        tasks: tasks as Record<string, Task>,
        setTasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    };
}