import type { Tag } from '@olegpolyakov/tasks-core';
import http from '@olegpolyakov/frontend/clients/http';

import { API_URL } from '@/env';
import { socket } from '@/ws';

import type { TagsApi } from './interface';

export default {
    events: socket,
    
    async fetchTags() {
        return http.get<Tag[]>(`${API_URL}/tags`);
    },

    async fetchTag(id: string): Promise<Tag> {
        return http.get<Tag>(`${API_URL}/tags/${id}`);
    },

    async createTag(data: Partial<Tag>) {
        return http.post<Tag>(`${API_URL}/tags`, data);
    },

    async updateTag(id: string, data: Partial<Tag>) {
        return http.put<Tag>(`${API_URL}/tags/${id}`, data);
    },

    async deleteTag(id: string, { deleteTasks = false }: { deleteTasks?: boolean } = {}) {
        return http.delete(`${API_URL}/tags/${id}`, { body: JSON.stringify({ deleteTasks }) });
    }
} satisfies TagsApi;