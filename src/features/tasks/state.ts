import { atom } from 'jotai';

import type { TaskData } from '@olegpolyakov/tasks-core';

import { listReducer, singleReducer, type Store } from '@/store';

export const tasksAtom = atom<TaskData[]>([]);
export const tasksReducer = listReducer<TaskData>('task');

export const taskAtom = atom<TaskData | null>(null);
export const taskReducer = singleReducer<TaskData>('task');

export function initState(store: Store) {
    store.set('tasks', tasksAtom);
    store.set('task', taskAtom);
}