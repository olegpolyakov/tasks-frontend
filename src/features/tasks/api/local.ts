import type { TaskData } from '@olegpolyakov/tasks-core';

import type { TasksApi } from './interface';

export default {
    events: new EventTarget(),

    async fetchTasks(): Promise<TaskData[]> {
        return [];
    },

    async createTask(data: Partial<TaskData>): Promise<TaskData> {
        return {} as TaskData;
    },

    async updateTask(id: string, data: Partial<TaskData>): Promise<TaskData> {
        return {} as TaskData;
    },

    async toggleTask(id: string, completed: boolean): Promise<TaskData> {
        return {} as TaskData;
    },

    async deleteTask(id: string): Promise<void> {
        return;
    }
} satisfies TasksApi;