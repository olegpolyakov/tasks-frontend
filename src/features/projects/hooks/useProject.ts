import { useCallback, useMemo } from 'react';

import type { ProjectData, ProjectSectionData } from '@olegpolyakov/tasks-core';

import useProjectsApi from './useProjectsApi';
import useProjectState from './useProjectState';

export default function useProject(projectId: string) {
    const api = useProjectsApi();
    const project = useProjectState(projectId, api);

    const updateProject = useCallback(async (data: Partial<ProjectData>) => {
        return api.updateProject(projectId, data);
    }, [projectId, api]);

    const deleteProject = useCallback(async (options: { deleteTasks: boolean }) => {
        return api.deleteProject(projectId, options);
    }, [projectId, api]);

    const createSection = useCallback(async (data: Partial<ProjectSectionData>) => {
        return api.createSection(projectId, data);
    }, [projectId, api]);

    const updateSection = useCallback(async (sectionId: string, data: Partial<ProjectSectionData>) => {
        return api.updateSection(projectId, sectionId, data);
    }, [projectId, api]);

    const deleteSection = useCallback(async (sectionId: string) => {
        return api.deleteSection(projectId, sectionId);
    }, [projectId, api]);

    const sections = useMemo(() => {
        if (!project) return [];

        return Object.entries(project.sectionData).map(([id, section]) => ({
            id,
            name: section.name,
            taskIds: section.taskIds
        }));
    }, [project]);

    return {
        project,
        updateProject,
        deleteProject,
        
        sections,
        createSection,
        updateSection,
        deleteSection
    };
}