import { useCallback } from 'react';

import { Tag } from '@olegpolyakov/tasks-core';

import useTagsApi from './useTagsApi';
import useTagsState from './useTagsState';

export default function useTags() {
    const api = useTagsApi();
    const tags = useTagsState(api);

    const createTag = useCallback(async (data: Partial<Tag>) => {
        return api.createTag(data);
    }, [api]);

    const updateTag = useCallback(async (id: string, data: Partial<Tag>) => {
        return api.updateTag(id, data);
    }, [api]);

    const deleteTag = useCallback(async (id: string) => {
        await api.deleteTag(id);
    }, [api]);

    return {
        tags,
        createTag,
        updateTag,
        deleteTag
    };
}