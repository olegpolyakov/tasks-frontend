import type { Task } from '@olegpolyakov/tasks-core';
import http from '@olegpolyakov/frontend/clients/http';

import { API_URL } from '@/env';

export async function fetchTasks(): Promise<Task[]> {
    return http.get<Task[]>(`${API_URL}/tasks`);
}

export async function createTask(data: Partial<Task>): Promise<Task> {
    return http.post<Task>(`${API_URL}/tasks`, data);
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
    return http.put<Task>(`${API_URL}/tasks/${id}`, data);
}

export async function toggleTask(id: string, completed: boolean): Promise<Task> {
    return http.patch<Task>(`${API_URL}/tasks/${id}`, { completed });
}

export async function deleteTask(id: string): Promise<void> {
    return http.delete(`${API_URL}/tasks/${id}`);
}