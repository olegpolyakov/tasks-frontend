import { useCallback, useEffect } from 'react';

import type { Project } from '@olegpolyakov/tasks-core';

import { useProjectsState } from '../state';

import useProjectsApi from './useProjectsApi';

export default function useProjects() {
    const api = useProjectsApi();
    const [projects, setProjects] = useProjectsState(api.events);

    useEffect(() => {
        api.fetchProjects().then(setProjects);
    }, [api, setProjects]);

    const createProject = useCallback(async (data: Partial<Project>) => {
        return api.createProject(data);
    }, [api]);

    const updateProject = useCallback(async (id: string, data: Partial<Project>) => {
        return api.updateProject(id, data);
    }, [api]);

    const deleteProject = useCallback(async (id: string) => {
        return api.deleteProject(id, { deleteTasks: false });
    }, [api]);

    return {
        projects,
        createProject,
        updateProject,
        deleteProject
    };
}