import { useCallback, useMemo } from 'react';

import { Task, TaskData } from '@olegpolyakov/tasks-core';
import { useToastsContext } from '@olegpolyakov/ui';
import { toRecordById } from '@olegpolyakov/core/utils/types';

import { getAllChildren } from '../logic/children';

import useTasksApi from './useTasksApi';
import useTasksState from './useTasksState';

export default function useTasks() {
    const api = useTasksApi();
    const tasks = useTasksState(api);
    const { showToast } = useToastsContext();

    const tasksById = useMemo(() => toRecordById(tasks), [tasks]);

    const notifyError = useCallback((message: string) => {
        showToast({ content: message, color: 'danger', icon: 'error', variant: 'filled' }, () => null);
    }, [showToast]);

    const createTask = useCallback(async (data: Partial<TaskData>) => {
        try {
            return await api.createTask(data) as Task;
        } catch (error) {
            notifyError('Failed to create task' + (data.title ? `: ${data.title}` : ''));
            throw error;
        }
    }, [api, notifyError]);

    const updateTask = useCallback(async (id: string, data: Partial<Task>) => {
        try {
            return await api.updateTask(id, data) as Task;
        } catch (error) {
            notifyError('Failed to update task');
            throw error;
        }
    }, [api, notifyError]);

    const toggleTask = useCallback(async (id: string, completed: boolean) => {
        const task = tasksById[id];
        const incompleteChildren = completed
            ? getAllChildren(id, tasksById, t => !t.completed)
            : [];

        if (
            incompleteChildren.length > 0 &&
            !confirm(`Completing this task will also mark ${incompleteChildren.length} sub-tasks complete. Are you sure?`)
        ) {
            return task;
        }

        const results = await Promise.allSettled(
            [task, ...incompleteChildren].map(t => api.toggleTask(t.id, completed))
        );

        const failures = results.filter(r => r.status === 'rejected');

        if (failures.length > 0) {
            notifyError(`${failures.length} ${failures.length === 1 ? 'task' : 'tasks'} could not be ${completed ? 'completed' : 'reopened'}`);

            throw failures[0].reason;
        }

        return (results[0] as PromiseFulfilledResult<TaskData>).value as Task;
    }, [api, tasksById, notifyError]);

    const deleteTask = useCallback(async (id: string) => {
        const task = tasksById[id];
        const children = getAllChildren(id, tasksById);
        const message = children.length > 0
            ? `Deleting this task will also delete ${children.length} sub-tasks. Are you sure?`
            : 'Are you sure you want to delete this task?';

        if (!confirm(message)) return;

        const results = await Promise.allSettled(
            [task, ...children].map(t => api.deleteTask(t.id))
        );

        const failures = results.filter(r => r.status === 'rejected');

        if (failures.length > 0) {
            notifyError(`${failures.length} ${failures.length === 1 ? 'task' : 'tasks'} could not be deleted`);

            throw failures[0].reason;
        }
    }, [api, tasksById, notifyError]);

    return {
        tasks,
        tasksById,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    };
}