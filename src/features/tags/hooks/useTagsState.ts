import { useEffect, useMemo } from 'react';

import { useAtom } from 'jotai';

import { Tag, type TagData } from '@olegpolyakov/tasks-core';

import { useStateEvents } from '@/store';

import type { TagsApi } from '../api';
import { tagsAtom, tagsReducer } from '../state';

export default function useTagsState(api: TagsApi) {
    const [state, setState] = useAtom(tagsAtom);

    useEffect(() => {
        api.fetchTags().then(setState);
    }, [api, setState]);

    useStateEvents<TagData>(
        api.events,
        action => setState(state => tagsReducer(state, action))
    );

    const tasks = useMemo(() => state.map(s => new Tag(s)), [state]);

    return tasks;
}