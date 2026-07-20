import type { ProjectData, ProjectSectionData, TaskData } from '@olegpolyakov/tasks-core';

export interface ProjectsApi {
    fetchProjects(): Promise<ProjectData[]>;
    fetchProject(id: string): Promise<ProjectData>;
    fetchProjectTasks(id: string): Promise<TaskData[]>;
    createProject(data: Partial<ProjectData>): Promise<ProjectData>;
    updateProject(id: string, data: Partial<ProjectData>): Promise<ProjectData>;
    deleteProject(id: string, options?: { deleteTasks: boolean }): Promise<void>;
    addSection(id: string, data: Partial<ProjectSectionData>): Promise<ProjectSectionData>;
    updateSection(projectId: string, sectionId: string, data: Partial<ProjectSectionData>): Promise<ProjectSectionData>;
    removeSection(projectId: string, sectionId: string): Promise<void>;
}