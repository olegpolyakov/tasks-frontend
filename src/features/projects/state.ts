import { atom, useAtom } from 'jotai';

import type { ProjectData } from '@olegpolyakov/tasks-core';

export const projectsAtom = atom<ProjectData[]>([]);

export function useProjectsState() {
    return useAtom(projectsAtom);
}