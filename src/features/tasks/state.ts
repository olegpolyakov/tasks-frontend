import { atom } from 'jotai';

import type { TaskData } from '@olegpolyakov/tasks-core';

import { type StateEvent, useRecordState, useSingleState } from '@/common/state';

const filter = (event: StateEvent<TaskData>) => event.model === 'Task';

export const tasksAtom = atom<Record<string, TaskData>>({});

export function useTasksState(events: EventTarget) {    
    return useRecordState(tasksAtom, events, filter);
}

export const taskAtom = atom<TaskData | null>(null);

export function useTaskState(events: EventTarget) {
    return useSingleState(taskAtom, events, filter);
}