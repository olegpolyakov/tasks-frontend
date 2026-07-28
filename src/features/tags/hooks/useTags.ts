import { useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';

import { Tag } from '@olegpolyakov/tasks-core';

import { tagsAtom } from '../state';

import useTagsApi from './useTagsApi';

export default function useTags() {
    const api = useTagsApi();

    const [tags, setTags] = useAtom(tagsAtom);

    useEffect(() => {
        api.fetchTags().then(setTags);
    }, [api, setTags]);

    const createTag = useCallback(async (data: Partial<Tag>) => {
        const createdTag = await api.createTag(data);

        setTags(prevTags => [...prevTags, createdTag]);

        return createdTag;
    }, [api, setTags]);

    const updateTag = useCallback(async (id: string, data: Partial<Tag>) => {
        const updatedTag = await api.updateTag(id, data);

        setTags(tags => tags.map(tag => tag.id === updatedTag.id ? updatedTag : tag));

        return updatedTag;
    }, [api, setTags]);

    const deleteTag = useCallback(async (id: string) => {
        await api.deleteTag(id);
        
        setTags(tags => tags.filter(tag => tag.id !== id));
    }, [api, setTags]);

    return {
        tags: tags.map(data => new Tag(data)),
        createTag,
        updateTag,
        deleteTag
    };
}