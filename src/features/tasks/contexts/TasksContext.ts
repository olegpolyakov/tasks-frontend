import { createContext, useContext } from 'react';

import type { Task } from '@olegpolyakov/tasks-core';

export type TasksContextValue = {
    heading?: string;
    tasks: Task[];
    createTask: (data: Partial<Task>) => Promise<Task>;
    updateTask: (id: string, data: Partial<Task>) => Promise<Task>;
    toggleTask: (id: string, completed: boolean) => Promise<Task>;
    deleteTask: (id: string) => Promise<void>;
};

const TasksContext = createContext<TasksContextValue>(null! as TasksContextValue);

export function useTasksContext() {
    const context = useContext(TasksContext);
    
    if (!context) {
        throw new Error('useTasksContext must be used within a TasksProvider');
    }
    
    return context;
}

export default TasksContext;