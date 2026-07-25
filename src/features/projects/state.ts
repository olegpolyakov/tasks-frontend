import { atom } from 'jotai';

import type { ProjectData } from '@olegpolyakov/tasks-core';

import { type StateEvent, useListState, useSingleState } from '@/common/state';

const filter = (event: StateEvent<ProjectData>) => event.model === 'Project';

export const projectsAtom = atom<ProjectData[]>([]);

export function useProjectsState(events: EventTarget) {    
    return useListState(projectsAtom, events, filter);
}

export const projectAtom = atom<ProjectData | null>(null);

export function useProjectState(events: EventTarget) {
    return useSingleState(projectAtom, events, filter);
}