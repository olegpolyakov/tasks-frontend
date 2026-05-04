import { useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';

import type { Task } from '@olegpolyakov/tasks-core';

import * as api from '../api';
import { tasksAtom } from '../atoms';

export default function useTasks() {
    const [tasks, setTasks] = useAtom(tasksAtom);

    useEffect(() => {
        api.fetchTasks().then(setTasks);
    }, [setTasks]);

    const createTask = useCallback(async (data: Partial<Task>) => {
        const createdTask = await api.createTask(data);

        setTasks(tasks => [...tasks, createdTask]);

        return createdTask;
    }, [setTasks]);

    const updateTask = useCallback(async (id: string, data: Partial<Task>) => {
        const updatedTask = await api.updateTask(id, data);

        setTasks(prevTasks => prevTasks.map(task => task.id === id ? updatedTask : task));

        return updatedTask;
    }, [setTasks]);

    const toggleTask = useCallback(async (id: string, completed: boolean) => {
        const updatedTask = await api.toggleTask(id, completed);

        setTasks(tasks => tasks.map(task => task.id === id ? updatedTask : task));

        return updatedTask;
    }, [setTasks]);

    const deleteTask = useCallback(async (id: string) => {
        await api.deleteTask(id);

        setTasks(tasks => tasks.filter(task => task.id !== id));
    }, [setTasks]);

    return {
        tasks,
        setTasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    };
}