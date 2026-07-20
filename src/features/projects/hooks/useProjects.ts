import { useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';

import type { Project } from '@olegpolyakov/tasks-core';

import * as api from '../api';
import { projectsAtom } from '../state';

export default function useProjects() {
    const [projects, setProjects] = useAtom(projectsAtom);

    useEffect(() => {
        api.fetchProjects().then(setProjects);
    }, [setProjects]);

    const createProject = useCallback(async (data: Partial<Project>) => {
        const nextProject = await api.createProject(data);

        setProjects(prevProjects => [...prevProjects, nextProject]);
    }, [setProjects]);

    const updateProject = useCallback(async (id: string, data: Partial<Project>) => {
        const updatedProject = await api.updateProject(id, data);

        setProjects(prevProjects => prevProjects.map(project => project.id === id ? updatedProject : project));
    }, [setProjects]);

    const deleteProject = useCallback(async (id: string) => {
        await api.deleteProject(id, { deleteTasks: false });

        setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
    }, [setProjects]);

    return {
        projects,
        createProject,
        updateProject,
        deleteProject
    };
}