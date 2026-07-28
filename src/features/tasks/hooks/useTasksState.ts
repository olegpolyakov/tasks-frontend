import { useEffect, useMemo } from 'react';

import { useAtom } from 'jotai';

import { Project, Tag, Task, TaskData } from '@olegpolyakov/tasks-core';
import { toRecordById } from '@olegpolyakov/core/utils/types';

import { useStateEvents, useStore } from '@/store';

import type { TasksApi } from '../api';
import { tasksAtom, tasksReducer } from '../state';

export default function useTasksState(api: TasksApi) {
    const projects = useStore<Project[]>('projects');
    const tags = useStore<Tag[]>('tags');
    
    const [state, setState] = useAtom(tasksAtom);

    useEffect(() => {
        api.fetchTasks().then(setState);
    }, [api, setState]);

    useStateEvents<TaskData>(
        api.events,
        action => setState(state => tasksReducer(state, action))
    );

    const tasks = useMemo(() => {
        const tagsById = toRecordById(tags);
        return state.map(data => new Task(data, {
            projects: projects.filter(p => p.taskIds.includes(data.id)),
            tags: data.tagIds.map(id => tagsById[id])
        }));
    }, [state, projects, tags]);

    return tasks;
}