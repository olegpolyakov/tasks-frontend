import type { Project, ProjectSection, Task } from '@olegpolyakov/tasks-core';

import { API_URL } from '@/env';

export async function fetchProjects(): Promise<Project[]> {
    return fetch(`${API_URL}/projects`).then(res => res.json());
}

export async function fetchProject(id: string): Promise<Project> {
    return fetch(`${API_URL}/projects/${id}`).then(res => res.json());
}

export async function fetchProjectTasks(id: string): Promise<Task[]> {
    return fetch(`${API_URL}/projects/${id}/tasks`).then(res => res.json());
}

export async function createProject(data: Partial<Project>) {
    return fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export async function updateProject(id: string, data: Partial<Project>) {
    return fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export async function deleteProject(id: string, options: { deleteTasks: boolean }) {
    return fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    }).then(res => res.json());
}

export async function addSection(projectId: string, data: Partial<ProjectSection>) {
    return fetch(`${API_URL}/projects/${projectId}/sections`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export async function updateSection(projectId: string, sectionId: string, data: Partial<ProjectSection>) {
    return fetch(`${API_URL}/projects/${projectId}/sections/${sectionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export async function removeSection(projectId: string, sectionId: string) {
    return fetch(`${API_URL}/projects/${projectId}/sections/${sectionId}`, {
        method: 'DELETE'
    }).then(res => res.json());
}