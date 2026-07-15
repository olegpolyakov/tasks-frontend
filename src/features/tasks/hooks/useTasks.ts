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
        const createdTask = await api.createTask(data);

        setTasks(tasks => [...tasks, createdTask]);

        return createdTask;
    }, [api, setTasks]);

    const updateTask = useCallback(async (id: string, data: Partial<Task>) => {
        const updatedTask = await api.updateTask(id, data);

        setTasks(prevTasks => prevTasks.map(task => task.id === id ? updatedTask : task));

        return updatedTask;
    }, [api, setTasks]);

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

            const completedTasks = toRecord(
                await Promise.all([task, ...incompleteTasks].map(task => api.toggleTask(task.id, true)))
            );

            setTasks(tasks => tasks.map(t =>
                t.id in completedTasks
                    ? completedTasks[t.id]
                    : t
            ));

            return completedTasks[id];
        } else {
            const updatedTask = await api.toggleTask(id, completed);
            
            setTasks(tasks => tasks.map(task => task.id === id ? updatedTask : task));
    
            return updatedTask;
        }
    }, [api, tasks, setTasks]);

    const deleteTask = useCallback(async (id: string) => {       
        const tasksRecord = toRecord(tasks);
        const task = tasksRecord[id];
        const children = getAllChildren(id, tasksRecord);

        if (children.length > 0) {
            if (!confirm(`Deleting this task will also delete ${children.length} sub-tasks. Are you sure?`)) {
                return;
            }

            const deleteTasks = toRecord(
                await Promise.all([task, ...children].map(async task => {
                    await api.deleteTask(task.id);
                    return task;
                }))
            );

            setTasks(tasks => tasks.filter(t => !(t.id in deleteTasks)));

            return deleteTasks[id];
        } else {
            if (!confirm('Are you sure you want to delete this task?')) {
                return;
            }

            await api.deleteTask(id);

            setTasks(tasks => tasks.filter(task => task.id !== id));
        }
    }, [api, tasks, setTasks]);

    return {
        tasks,
        setTasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    };
}