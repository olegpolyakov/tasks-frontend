import type { Project, ProjectData, ProjectSectionData, Task } from '@olegpolyakov/tasks-core';
import http from '@olegpolyakov/frontend/clients/http';

import { API_URL } from '@/env';
import { socket } from '@/ws';

import type { ProjectsApi } from './interface';

export default {
    events: socket,

    async fetchProjects(): Promise<ProjectData[]> {
        return http.get(`${API_URL}/projects`);
    },

    async fetchProject(id: string): Promise<ProjectData> {
        return http.get(`${API_URL}/projects/${id}`);
    },

    async fetchProjectTasks(id: string): Promise<Task[]> {
        return http.get(`${API_URL}/projects/${id}/tasks`);
    },

    async createProject(data: Partial<Project>) {
        return http.post(`${API_URL}/projects`, data);
    },

    async updateProject(id: string, data: Partial<Project>) {
        return http.put(`${API_URL}/projects/${id}`, data);
    },

    async deleteProject(id: string, options: { deleteTasks?: boolean } = {}) {
        await http.delete(`${API_URL}/projects/${id}`, {
            body: JSON.stringify(options)
        });
    },

    async createSection(projectId: string, data: Partial<ProjectSectionData>) {
        return http.post(`${API_URL}/projects/${projectId}/sections`, data);
    },

    async updateSection(projectId: string, sectionId: string, data: Partial<ProjectSectionData>) {
        return http.put(`${API_URL}/projects/${projectId}/sections/${sectionId}`, data);
    },

    async deleteSection(projectId: string, sectionId: string) {
        return http.delete(`${API_URL}/projects/${projectId}/sections/${sectionId}`);
    }
} satisfies ProjectsApi;