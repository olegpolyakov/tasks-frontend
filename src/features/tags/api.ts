import type { Tag } from '@olegpolyakov/tasks-core';

import { API_URL } from '@/shared/constants';
import http from '@/shared/http';

export async function fetchTags() {
    return http.get<Tag[]>(`${API_URL}/tags`);
}

export async function fetchTag(id: string): Promise<Tag> {
    return http.get<Tag>(`${API_URL}/tags/${id}`);
}

export async function createTag(data: Partial<Tag>) {
    return http.post<Partial<Tag>, Tag>(`${API_URL}/tags`, data);
}

export async function updateTag(id: string, data: Partial<Tag>) {
    return http.put<Partial<Tag>, Tag>(`${API_URL}/tags/${id}`, data);
}

export async function deleteTag(id: string, { deleteTasks = false }: { deleteTasks?: boolean } = {}) {
    return http.delete(`${API_URL}/tags/${id}`, { body: JSON.stringify({ deleteTasks }) });
}