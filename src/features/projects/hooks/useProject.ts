import { useCallback, useEffect, useMemo, useState } from 'react';

import type { ProjectData, ProjectSectionData } from '@olegpolyakov/tasks-core';

import useProjectsApi from './useProjectsApi';

export default function useProject(projectId: string) {
    const api = useProjectsApi();

    const [project, setProject] = useState<ProjectData | null>(null);

    useEffect(() => {
        api.fetchProject(projectId).then(setProject);
    }, [projectId, api]);

    const updateProject = useCallback(async (data: Partial<ProjectData>) => {
        await api.updateProject(projectId, data);
    }, [projectId, api]);

    const deleteProject = useCallback(async (options: { deleteTasks: boolean }) => {
        await api.deleteProject(projectId, options);
    }, [projectId, api]);

    const addSection = useCallback(async (data: Partial<ProjectSectionData>) => {
        await api.addSection(projectId, data).then(section => {
            setProject(project => {
                if (!project) return project;

                return {
                    ...project,
                    sectionIds: [...project.sectionIds, section.id],
                    sectionData: {
                        ...project.sectionData,
                        [section.id]: section
                    }
                } as ProjectData;
            });
        });
    }, [projectId, api]);

    const updateSection = useCallback(async (sectionId: string, data: Partial<ProjectSectionData>) => {
        await api.updateSection(projectId, sectionId, data)
            .then(section => {
                setProject(project => {
                    if (!project) return project;

                    return {
                        ...project,
                        sectionData: {
                            ...project.sectionData,
                            [sectionId]: section
                        }
                    } as ProjectData;
                });
            });
    }, [projectId, api]);

    const removeSection = useCallback(async (sectionId: string) => {
        await api.removeSection(projectId, sectionId).then(() => {
            setProject(project => {
                if (!project) return project;

                const { [sectionId]: _, ...sections } = project.sectionData;

                return {
                    ...project,
                    sectionIds: project.sectionIds.filter(id => id !== sectionId),
                    sections
                };
            });
        });
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
        addSection,
        updateSection,
        removeSection
    };
}