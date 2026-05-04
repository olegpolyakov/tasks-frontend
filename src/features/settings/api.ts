import type { Settings } from '@olegpolyakov/tasks/core';

import { API_URL } from '@/shared/constants';
import http from '@/shared/http';

export async function fetchSettings(): Promise<Settings> {
    return http.get<Settings>(`${API_URL}/settings`);
}

export async function updateSettings(data: Partial<Settings>): Promise<Settings> {
    return http.put<Partial<Settings>, Settings>(`${API_URL}/settings`, data);
}