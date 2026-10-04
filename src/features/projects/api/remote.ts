import type { ProjectData, ProjectSectionData } from '@olegpolyakov/tasks-core';
import type { HttpClient } from '@olegpolyakov/frontend/clients/http';
import type { WsClient } from '@olegpolyakov/frontend/clients/ws';

import { API_URL } from '@/env';

import type { ProjectsApi } from './interface';

export default (http: HttpClient, ws: WsClient): ProjectsApi => ({
    events: ws,

    async fetchProjects(): Promise<ProjectData[]> {
        return http.get<ProjectData[]>(`${API_URL}/projects`);
    },

    async fetchProject(id: string): Promise<ProjectData> {
        return http.get<ProjectData>(`${API_URL}/projects/${id}`);
    },

    async createProject(data: Partial<ProjectData>) {
        return http.post<ProjectData>(`${API_URL}/projects`, data);
    },

    async updateProject(id: string, data: Partial<ProjectData>) {
        return http.put<ProjectData>(`${API_URL}/projects/${id}`, data);
    },

    async deleteProject(id: string, options: { deleteTasks?: boolean } = {}) {
        await http.delete(`${API_URL}/projects/${id}`, {
            body: JSON.stringify(options)
        });
    },

    async createSection(projectId: string, data: Partial<ProjectSectionData>) {
        return http.post<ProjectSectionData>(`${API_URL}/projects/${projectId}/sections`, data);
    },

    async updateSection(projectId: string, sectionId: string, data: Partial<ProjectSectionData>) {
        return http.put<ProjectSectionData>(`${API_URL}/projects/${projectId}/sections/${sectionId}`, data);
    },

    async deleteSection(projectId: string, sectionId: string) {
        return http.delete(`${API_URL}/projects/${projectId}/sections/${sectionId}`);
    }
});