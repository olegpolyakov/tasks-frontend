import { v4 as uuid } from 'uuid';

import { Project, ProjectData, ProjectSectionData } from '@olegpolyakov/tasks-core';

import type { ProjectsApi } from './interface';

const projects = new Map<string, ProjectData>();
const events = new EventTarget();

export default (): ProjectsApi => ({
    events,

    async fetchProjects(): Promise<ProjectData[]> {
        return Array.from(projects.values());
    },

    async fetchProject(id: string): Promise<ProjectData> {
        const project = projects.get(id);

        if (!project) throw new Error('Project not found');

        return project;
    },

    async createProject(data: Partial<ProjectData>) {
        const id = uuid();
        const project = new Project({ id, ...data });

        projects.set(id, project.toData());

        this.events.dispatchEvent(new MessageEvent('message', {
            data: JSON.stringify({
                model: 'Project',
                action: 'insert',
                documentId: id,
                data: project.toData()
            })
        }));

        return project;
    },

    async updateProject(id: string, data: Partial<ProjectData>) {
        const project = projects.get(id);

        if (!project) throw new Error('Project not found');

        const updatedProject = { ...project, ...data } as ProjectData;
        projects.set(id, updatedProject);

        this.events.dispatchEvent(new MessageEvent('message', {
            data: JSON.stringify({
                model: 'Project',
                action: 'update',
                documentId: id,
                data: updatedProject
            })
        }));

        return updatedProject;
    },

    async deleteProject(id: string, options: { deleteTasks?: boolean } = {}) {
        projects.delete(id);

        this.events.dispatchEvent(new MessageEvent('message', {
            data: JSON.stringify({
                model: 'Project',
                action: 'delete',
                documentId: id,
                data: null
            })
        }));
        
        return;
    },

    async createSection(projectId: string, data: Partial<ProjectSectionData>) {
        return {} as ProjectSectionData;
    },

    async updateSection(projectId: string, sectionId: string, data: Partial<ProjectSectionData>) {
        return {} as ProjectSectionData;
    },

    async deleteSection(projectId: string, sectionId: string) {
        return;
    }
});