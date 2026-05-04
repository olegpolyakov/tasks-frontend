import type { Task } from '@olegpolyakov/tasks-core';

import { API_URL } from '@/shared/constants';
import http from '@/shared/http';

export async function fetchTasks(): Promise<Task[]> {
    return http.get<Task[]>(`${API_URL}/tasks`);
}

export async function createTask(data: Partial<Task>): Promise<Task> {
    return http.post<Partial<Task>, Task>(`${API_URL}/tasks`, data);
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
    return http.put<Partial<Task>, Task>(`${API_URL}/tasks/${id}`, data);
}

export async function toggleTask(id: string, completed: boolean): Promise<Task> {
    return http.patch<Partial<Task>, Task>(`${API_URL}/tasks/${id}`, { completed });
}

export async function deleteTask(id: string): Promise<void> {
    return http.delete(`${API_URL}/tasks/${id}`);
}