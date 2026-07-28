import { type ReactNode, useCallback, useMemo } from 'react';

import type { Task } from '@olegpolyakov/tasks-core';
import { toRecord } from '@olegpolyakov/core/utils/types';

import { TasksContext, TasksContextValue, useTasksContext } from '@/features/tasks';

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

    const tagTasks = useMemo(() => {
        return tag
            ? tasks.filter(task => task.tagIds.includes(tag.id))
            : [];
    }, [tag, tasks]);

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

    const tasksValue = useMemo<TasksContextValue>(() => ({
        tasks: tagTasks,
        tasksById: toRecord(tagTasks, t => t.id),
        createTask: createTaskWithTag,
        updateTask,
        toggleTask,
        deleteTask
    }), [
        tagTasks,
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