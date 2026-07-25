import type { TaskData } from '@olegpolyakov/tasks-core';
import http from '@olegpolyakov/frontend/clients/http';

import { socket } from '@/common/ws';
import { API_URL } from '@/env';

import type { TasksApi } from './interface';

export default {
    events: socket,

    async fetchTasks(): Promise<TaskData[]> {
        return http.get<TaskData[]>(`${API_URL}/tasks`);
    },

    async createTask(data: Partial<TaskData>): Promise<TaskData> {
        return http.post<TaskData>(`${API_URL}/tasks`, data);
    },

    async updateTask(id: string, data: Partial<TaskData>): Promise<TaskData> {
        return http.put<TaskData>(`${API_URL}/tasks/${id}`, data);
    },

    async toggleTask(id: string, completed: boolean): Promise<TaskData> {
        return http.patch<TaskData>(`${API_URL}/tasks/${id}`, { completed });
    },

    async deleteTask(id: string): Promise<void> {
        return http.delete(`${API_URL}/tasks/${id}`);
    }
} satisfies TasksApi;