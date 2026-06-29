import type { Tag } from '@olegpolyakov/tasks-core';
import http from '@olegpolyakov/frontend/clients/http';

import { API_URL } from '@/env';

export async function fetchTags() {
    return http.get<Tag[]>(`${API_URL}/tags`);
}

export async function fetchTag(id: string): Promise<Tag> {
    return http.get<Tag>(`${API_URL}/tags/${id}`);
}

export async function createTag(data: Partial<Tag>) {
    return http.post<Tag>(`${API_URL}/tags`, data);
}

export async function updateTag(id: string, data: Partial<Tag>) {
    return http.put<Tag>(`${API_URL}/tags/${id}`, data);
}

export async function deleteTag(id: string, { deleteTasks = false }: { deleteTasks?: boolean } = {}) {
    return http.delete(`${API_URL}/tags/${id}`, { body: JSON.stringify({ deleteTasks }) });
}