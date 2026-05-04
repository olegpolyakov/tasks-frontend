import { type ReactNode, useCallback, useMemo } from 'react';

import type { Task } from '@olegpolyakov/tasks-core';

import { TasksContext, useTasksContext } from '@/features/tasks';

import { TagContext, TagContextValue } from '../contexts';
import { useTag } from '../hooks';

export default function TagProvider({
    tagId,
    children
}: {
    tagId: string;
    children: ReactNode | ((value: TagContextValue) => ReactNode);
}) {
    const { tag, setTag, updateTag, deleteTag } = useTag(tagId);
    const {
        tasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    } = useTasksContext();

    const createTaskWithTag = useCallback(async (data: Partial<Task>) => {
        const tagIds = new Set(data.tagIds || []);

        tagIds.add(tagId);

        return createTask({
            ...data,
            tagIds: Array.from(tagIds)
        });
    }, [createTask, tagId]);

    const tagValue = useMemo(() => ({
        tag: tag!,
        setTag,
        updateTag,
        deleteTag
    }), [tag, setTag, updateTag, deleteTag]);

    const tasksValue = useMemo(() => ({
        tasks: tag
            ? tasks.filter(task => task.tagIds.includes(tag.id))
            : [],
        createTask: createTaskWithTag,
        updateTask,
        toggleTask,
        deleteTask
    }), [
        tag,
        tasks,
        createTaskWithTag,
        updateTask,
        toggleTask,
        deleteTask
    ]);

    if (!tag) return null;

    return (
        <TagContext.Provider value={tagValue}>
            <TasksContext.Provider value={tasksValue}>
                {typeof children === 'function'
                    ? children(tagValue)
                    : children
                }
            </TasksContext.Provider>
        </TagContext.Provider>
    );
}