import { useCallback, useMemo, useState } from 'react';

import { useSettingsContext } from '@/features/settings';

import { type Sorts, sorts } from '../logic/sort';

export default function useTasksSort(id: string) {
    const { settings, updateSettings } = useSettingsContext();

    const tasksSort = settings.tasksSort?.[id] || '';

    const [key, setKey] = useState(() => tasksSort.split(':')[0]);
    const [dir, setDir] = useState(() => (tasksSort.split(':')[1] === 'desc' ? -1 : 1));

    const changeSortKey = useCallback((key: string) => {
        setKey(key);
        setDir(1);
        updateSettings({
            tasksSort: {
                ...settings.tasksSort,
                [id]: `${key}:asc`
            }
        });
    }, [id, settings.tasksSort, updateSettings]);

    const toggleSortDir = useCallback(() => {
        setDir(dir * -1);
        updateSettings({
            tasksSort: {
                ...settings.tasksSort,
                [id]: `${key}:${(dir * -1) === 1 ? 'desc' : 'asc'}`
            }
        });
    }, [id, key, dir, settings.tasksSort, updateSettings]);

    const clearSort = useCallback(() => {
        setKey('');
        setDir(0);
        updateSettings({
            tasksSort: {
                ...settings.tasksSort,
                [id]: ''
            }
        });
    }, [id, settings.tasksSort, updateSettings]);

    const sortsWithDir = useMemo<Sorts>(() => ({
        dueDate: (a, b) => sorts.dueDate(a, b) * dir,
        priority: (a, b) => sorts.priority(a, b) * dir,
        createdAt: (a, b) => sorts.createdAt(a, b) * dir
    }), [dir]);

    return {
        sort: sortsWithDir[key],
        sortKey: key,
        sortDir: dir,
        changeSortKey,
        toggleSortDir,
        clearSort
    };
}