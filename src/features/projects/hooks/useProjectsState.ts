import { useEffect, useMemo } from 'react';

import { useAtom } from 'jotai';

import { Project, type ProjectData } from '@olegpolyakov/tasks-core';

import { useStateEvents } from '@/store';

import type { ProjectsApi } from '../api';
import { projectsAtom, projectsReducer } from '../state';

export default function useProjectsState(api: ProjectsApi) {
    const [state, setState] = useAtom(projectsAtom);

    useEffect(() => {
        api.fetchProjects().then(setState);
    }, [api, setState]);

    useStateEvents<ProjectData>(
        api.events,
        action => setState(state => projectsReducer(state, action))
    );

    const projects = useMemo(() => state.map(s => new Project(s)), [state]);

    return projects;
}