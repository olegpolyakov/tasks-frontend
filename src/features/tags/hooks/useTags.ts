import { useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';

import type { Tag } from '@olegpolyakov/tasks-core';

import * as api from '../api';
import { tagsAtom } from '../atoms';

export default function useTags() {
    const [tags, setTags] = useAtom(tagsAtom);

    useEffect(() => {
        api.fetchTags().then(setTags);
    }, [setTags]);

    const createTag = useCallback(async (data: Partial<Tag>) => {
        const createdTag = await api.createTag(data);

        setTags(prevTags => [...prevTags, createdTag]);

        return createdTag;
    }, [setTags]);

    const updateTag = useCallback(async (id: string, data: Partial<Tag>) => {
        const updatedTag = await api.updateTag(id, data);

        setTags(tags => tags.map(tag => tag.id === updatedTag.id ? updatedTag : tag));

        return updatedTag;
    }, [setTags]);

    const deleteTag = useCallback(async (id: string) => {
        await api.deleteTag(id);
        
        setTags(tags => tags.filter(tag => tag.id !== id));
    }, [setTags]);

    return {
        tags,
        createTag,
        updateTag,
        deleteTag
    };
}