import { atom, useAtom } from 'jotai';

import type { TaskData } from '@olegpolyakov/tasks-core';

export const tasksAtom = atom<TaskData[]>([]);

export function useTasksState() {
    return useAtom(tasksAtom);
}

export const taskAtom = atom<TaskData | null>(null);

export function useTaskState() {
    return useAtom(taskAtom);
}