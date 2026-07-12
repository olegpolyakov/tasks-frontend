import { atom } from 'jotai';

import type { TaskData } from '@olegpolyakov/tasks-core';

export const tasksAtom = atom<TaskData[]>([]);
export const taskAtom = atom<TaskData | null>(null);