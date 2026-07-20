import { atom } from 'jotai';

import type { Project } from '@olegpolyakov/tasks-core';

export const projectsAtom = atom<Project[]>([]);