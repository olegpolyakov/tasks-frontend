import type { Project, ProjectData, ProjectSectionData, Task } from '@olegpolyakov/tasks-core';

import { API_URL } from '@/env';

import type { ProjectsApi } from './interface';

export default {
    async fetchProjects(): Promise<ProjectData[]> {
        return fetch(`${API_URL}/projects`).then(res => res.json());
    },

    async fetchProject(id: string): Promise<ProjectData> {
        return fetch(`${API_URL}/projects/${id}`).then(res => res.json());
    },

    async fetchProjectTasks(id: string): Promise<Task[]> {
        return fetch(`${API_URL}/projects/${id}/tasks`).then(res => res.json());
    },

    async createProject(data: Partial<Project>) {
        return fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

    async updateProject(id: string, data: Partial<Project>) {
        return fetch(`${API_URL}/projects/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

    async deleteProject(id: string, options?: { deleteTasks: boolean }) {
        await fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        }).then(res => res.json());
    },

    addSection(projectId: string, data: Partial<ProjectSectionData>) {
        return fetch(`${API_URL}/projects/${projectId}/sections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

    updateSection(projectId: string, sectionId: string, data: Partial<ProjectSectionData>) {
        return fetch(`${API_URL}/projects/${projectId}/sections/${sectionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

    removeSection(projectId: string, sectionId: string) {
        return fetch(`${API_URL}/projects/${projectId}/sections/${sectionId}`, {
            method: 'DELETE'
        }).then(res => res.json());
    }
} satisfies ProjectsApi;


