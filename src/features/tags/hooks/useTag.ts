import { useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';

import type { Tag } from '@olegpolyakov/tasks/core';

import { useSettingsContext } from '@/features/settings';

import * as api from '../api';
import { tagAtom } from '../atoms';

export default function useTag(tagId: string) {
    const { settings, updateSettings } = useSettingsContext();
    
    const [tag, setTag] = useAtom(tagAtom);

    useEffect(() => {
        api.fetchTag(tagId).then(setTag);
    }, [tagId, setTag]);

    const updateTag = useCallback(async (data: Partial<Tag>) => {
        const updatedTag = await api.updateTag(tagId, data);
        setTag(updatedTag);
    }, [tagId, setTag]);

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
    }, [tagId, settings, updateSettings, setTag]);

    return {
        tag,
        setTag,
        updateTag,
        deleteTag
    };
}