import type { TaskData } from '@olegpolyakov/tasks-core';

export interface TasksApi {
    events: EventTarget;
    fetchTasks(): Promise<TaskData[]>;
    createTask(data: Partial<TaskData>): Promise<TaskData>;
    updateTask(id: string, data: Partial<TaskData>): Promise<TaskData>;
    toggleTask(id: string, completed: boolean): Promise<TaskData>;
    deleteTask(id: string): Promise<void>
}