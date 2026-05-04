import { type ReactNode, useCallback, useMemo, useState } from 'react';

import type { Task } from '@olegpolyakov/tasks-core';

import { TaskContext, TaskContextValue, useTasksContext } from '../contexts';

export default function TaskProvider({
    children
}: {
    children: ReactNode | ((value: TaskContextValue) => ReactNode);
}) {
    const {
        tasks,
        updateTask: _updateTask,
        toggleTask: _toggleTask,
        deleteTask: _deleteTask
    } = useTasksContext();

    const [taskId, setTaskId] = useState<string | null>(null);

    const task = tasks.find(t => t.id === taskId) || null;

    const updateTask = useCallback(async (data: Partial<Task>) => {
        if (!task) return;

        await _updateTask(task.id, data);
    }, [task, _updateTask]);

    const toggleTask = useCallback(async (completed: boolean) => {
        if (!task) return;

        await _toggleTask(task.id, completed);
    }, [task, _toggleTask]);

    const deleteTask = useCallback(async () => {
        if (!task) return;

        await _deleteTask(task.id);
    }, [task, _deleteTask]);

    const setTask = useCallback((arg: string | Task) => {
        if (typeof arg === 'string') {
            setTaskId(arg);
        } else {
            setTaskId(arg.id);
        }
    }, []);

    const unsetTask = useCallback(() => {
        setTaskId(null);
    }, []);

    const value = useMemo(() => ({
        task: task!,
        setTask,
        unsetTask,
        updateTask,
        toggleTask,
        deleteTask
    }), [
        task,
        setTask,
        unsetTask,
        updateTask,
        toggleTask,
        deleteTask
    ]);

    return (
        <TaskContext.Provider value={value}>
            {typeof children === 'function'
                ? children(value)
                : children
            }
        </TaskContext.Provider>
    );
}