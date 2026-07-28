import { createContext } from 'react';

import type { Task, TaskData } from '@olegpolyakov/tasks-core';

export type TaskContextValue = {
    task: Task;
    setTask: (task: Task) => void;
    unsetTask: () => void;
    updateTask: (data: Partial<TaskData>) => Promise<Task>;
    toggleTask: (completed: boolean) => Promise<Task>;
    deleteTask: () => Promise<void>;
};

export default createContext<TaskContextValue>(null! as TaskContextValue);