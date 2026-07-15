import type { Task } from '@olegpolyakov/tasks-core';
import http from '@olegpolyakov/frontend/clients/http';

import { API_URL } from '@/env';

import type { TasksApi } from './interface';

export default {
    async fetchTasks(): Promise<Task[]> {
        return http.get<Task[]>(`${API_URL}/tasks`);
    },

    async createTask(data: Partial<Task>): Promise<Task> {
        return http.post<Task>(`${API_URL}/tasks`, data);
    },

    async updateTask(id: string, data: Partial<Task>): Promise<Task> {
        return http.put<Task>(`${API_URL}/tasks/${id}`, data);
    },

    async toggleTask(id: string, completed: boolean): Promise<Task> {
        return http.patch<Task>(`${API_URL}/tasks/${id}`, { completed });
    },

    async deleteTask(id: string): Promise<void> {
        return http.delete(`${API_URL}/tasks/${id}`);
    }
} satisfies TasksApi;