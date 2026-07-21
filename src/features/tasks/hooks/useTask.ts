import { useCallback, useState } from 'react';

import { Task } from '@olegpolyakov/tasks-core';

import { useTasksContext } from '../contexts';

export default function useTask() {
    const {
        tasks,
        updateTask: _updateTask,
        toggleTask: _toggleTask,
        deleteTask: _deleteTask
    } = useTasksContext();
    
    const [taskId, setTaskId] = useState<string | null>(null);
    
    const task = tasks.find(t => t.id === taskId) || null;
    
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

    return {
        task,
        setTask,
        unsetTask,
        updateTask,
        toggleTask,
        deleteTask
    };
}