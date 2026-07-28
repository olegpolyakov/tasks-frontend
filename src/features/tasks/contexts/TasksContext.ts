import { createContext } from 'react';

import type { Task, TaskData } from '@olegpolyakov/tasks-core';

export type TasksContextValue = {
    tasks: Task[];
    tasksById: Record<string, Task>;
    createTask: (data: Partial<TaskData>) => Promise<Task>;
    updateTask: (id: string, data: Partial<TaskData>) => Promise<Task>;
    toggleTask: (id: string, completed: boolean) => Promise<Task>;
    deleteTask: (id: string) => Promise<void>;
};

export default createContext<TasksContextValue>(null! as TasksContextValue);