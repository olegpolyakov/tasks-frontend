import { atom } from 'jotai';

import type { ProjectData } from '@olegpolyakov/tasks-core';

import { listReducer, singleReducer, type Store } from '@/store';

export const projectsAtom = atom<ProjectData[]>([]);
export const projectsReducer = listReducer<ProjectData>('project');

export const projectAtom = atom<ProjectData | null>(null);
export const projectReducer = singleReducer<ProjectData>('project');

export function initState(store: Store) {
    store.set('projects', projectsAtom);
    store.set('project', projectAtom);
}