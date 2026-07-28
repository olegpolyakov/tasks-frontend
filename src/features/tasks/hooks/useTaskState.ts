import { useAtom } from 'jotai';

import type { TaskData } from '@olegpolyakov/tasks-core';

import { useStateEvents } from '@/store';

import type { TasksApi } from '../api';
import { taskAtom, taskReducer } from '../state';

export default function useTaskState(api: TasksApi) {
    const [state, setState] = useAtom(taskAtom);

    useStateEvents<TaskData>(
        api.events,
        action => setState(state => taskReducer(state, action))
    );

    return [state, setState] as [typeof state, typeof setState];
}