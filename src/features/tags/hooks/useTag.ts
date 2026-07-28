import { useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';

import { Tag } from '@olegpolyakov/tasks-core';

import { useSettingsContext } from '@/features/settings';

import { tagAtom } from '../state';

import useTagsApi from './useTagsApi';

export default function useTag(tagId: string) {
    const api = useTagsApi();
    
    const { settings, updateSettings } = useSettingsContext();
    
    const [tag, setTag] = useAtom(tagAtom);

    useEffect(() => {
        api.fetchTag(tagId).then(setTag);
    }, [api, tagId, setTag]);

    const updateTag = useCallback(async (data: Partial<Tag>) => {
        const updatedTag = await api.updateTag(tagId, data);
        setTag(updatedTag);
    }, [api, tagId, setTag]);

    const deleteTag = useCallback(async () => {
        await api.deleteTag(tagId);

        const tagsOrder = settings.tagsOrder.filter(id => id !== tagId);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [tagId]: _, ...tasksOrder } = settings.tasksOrder;

        await updateSettings({
            tagsOrder,
            tasksOrder
        });

        setTag(null);
    }, [api, tagId, settings, updateSettings, setTag]);

    return {
        tag: tag ? new Tag(tag) : null,
        setTag,
        updateTag,
        deleteTag
    };
}