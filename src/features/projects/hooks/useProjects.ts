import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Project } from '@olegpolyakov/tasks-core';

import useProjectsApi from './useProjectsApi';
import useProjectsState from './useProjectsState';

export default function useProjects() {
    const api = useProjectsApi();
    const projects = useProjectsState(api);
    const navigate = useNavigate();

    const createProject = useCallback(async (data: Partial<Project>) => {
        const project = await api.createProject(data);
        navigate(`/projects/${project.id}`);
        return project;
    }, [api, navigate]);

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