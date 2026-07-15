import type { Task } from '@olegpolyakov/tasks-core';

export interface TasksApi {
    fetchTasks(): Promise<Task[]>;
    createTask(data: Partial<Task>): Promise<Task>;
    updateTask(id: string, data: Partial<Task>): Promise<Task>;
    toggleTask(id: string, completed: boolean): Promise<Task>;
    deleteTask(id: string): Promise<void>
}