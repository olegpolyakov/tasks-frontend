import { createContext, useContext } from 'react';

import type { Task, TaskData } from '@olegpolyakov/tasks-core';

export type TasksContextValue = {
    tasks: Record<string, Task>;
    tasksList: Task[];
    createTask: (data: Partial<TaskData>) => Promise<TaskData>;
    updateTask: (id: string, data: Partial<TaskData>) => Promise<Task>;
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