import { useCallback, useEffect } from 'react';

import type { Project } from '@olegpolyakov/tasks-core';

import { useProjectsState } from '../state';

import useProjectsApi from './useProjectsApi';

export default function useProjects() {
    const api = useProjectsApi();
    const [projects, setProjects] = useProjectsState();

    useEffect(() => {
        api.fetchProjects().then(setProjects);
    }, [api, setProjects]);

    const createProject = useCallback(async (data: Partial<Project>) => {
        const nextProject = await api.createProject(data);

        setProjects(prevProjects => [...prevProjects, nextProject]);
    }, [api, setProjects]);

    const updateProject = useCallback(async (id: string, data: Partial<Project>) => {
        const updatedProject = await api.updateProject(id, data);

        setProjects(prevProjects => prevProjects.map(project => project.id === id ? updatedProject : project));
    }, [api, setProjects]);

    const deleteProject = useCallback(async (id: string) => {
        await api.deleteProject(id, { deleteTasks: false });

        setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
    }, [api, setProjects]);

    return {
        projects,
        createProject,
        updateProject,
        deleteProject
    };
}