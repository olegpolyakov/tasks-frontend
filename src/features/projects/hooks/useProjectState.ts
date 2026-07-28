import { useEffect, useMemo } from 'react';

import { useAtom } from 'jotai';

import { Project, type ProjectData } from '@olegpolyakov/tasks-core';

import { useStateEvents } from '@/store';

import type { ProjectsApi } from '../api';
import { projectAtom, projectReducer } from '../state';

export default function useProjectsState(projectId: string, api: ProjectsApi) {
    const [state, setState] = useAtom(projectAtom);

    useEffect(() => {
        api.fetchProject(projectId).then(setState);
    }, [projectId, api, setState]);

    useStateEvents<ProjectData>(
        api.events,
        action => setState(state => projectReducer(state, action))
    );

    const project = useMemo(() => state ? new Project(state) : null, [state]);

    return project;
}