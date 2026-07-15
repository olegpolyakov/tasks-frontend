import type { Task } from '@olegpolyakov/tasks-core';

import type { TasksApi } from './interface';

export default {
    async fetchTasks(): Promise<Task[]> {
        return [];
    },

    async createTask(data: Partial<Task>): Promise<Task> {
        return {} as Task;
    },

    async updateTask(id: string, data: Partial<Task>): Promise<Task> {
        return {} as Task;
    },

    async toggleTask(id: string, completed: boolean): Promise<Task> {
        return {} as Task;
    },

    async deleteTask(id: string): Promise<void> {
        return;
    }
} satisfies TasksApi;