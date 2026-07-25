import { useCallback, useState } from 'react';

import { Task } from '@olegpolyakov/tasks-core';

import { useTasksContext } from '../contexts';

export default function useTask() {
    const {
        tasks: tasks,
        updateTask: _updateTask,
        toggleTask: _toggleTask,
        deleteTask: _deleteTask
    } = useTasksContext();
    
    const [taskId, setTaskId] = useState<string>('');
    
    const task = tasks[taskId] as Task;
    
    const setTask = useCallback((arg: string | Task) => {
        if (typeof arg === 'string') {
            setTaskId(arg);
        } else {
            setTaskId(arg.id);
        }
    }, []);
    
    const unsetTask = useCallback(() => {
        setTaskId('');
    }, []);
    
    const updateTask = useCallback(async (data: Partial<Task>) => {
        if (!task) throw new Error('No task');
    
        return _updateTask(task.id, data);
    }, [task, _updateTask]);
    
    const toggleTask = useCallback(async (completed: boolean) => {
        if (!task) throw new Error('No task');
    
        return _toggleTask(task.id, completed);
    }, [task, _toggleTask]);
    
    const deleteTask = useCallback(async () => {
        if (!task) throw new Error('No task');
    
        return _deleteTask(task.id);
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