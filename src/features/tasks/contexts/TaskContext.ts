import { createContext, useContext } from 'react';

import type { Task, TaskData } from '@olegpolyakov/tasks-core';

export type TaskContextValue = {
    task: Task;
    setTask: (task: Task) => void;
    unsetTask: () => void;
    updateTask: (data: Partial<TaskData>) => Promise<Task>;
    toggleTask: (completed: boolean) => Promise<Task>;
    deleteTask: () => Promise<void>;
};

const TaskContext = createContext<TaskContextValue>(null! as TaskContextValue);

export function useTaskContext() {
    const context = useContext(TaskContext);
    
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    
    return context;
}

export default TaskContext;