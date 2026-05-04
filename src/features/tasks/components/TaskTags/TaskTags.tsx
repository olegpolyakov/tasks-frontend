import { useCallback } from 'react';

import type { Tag, Task } from '@olegpolyakov/tasks-core';

import { TagsInput, useTagsContext } from '@/features/tags';

export default function TaskTags({
    task,
    onChange
}:{
    task: Task,
    onChange: (tagIds: string[]) => void
}) {
    const { createTag } = useTagsContext();

    const handleAdd = useCallback(async (tag: Partial<Tag>) => {
        const newTag = await createTag(tag);

        onChange([...task.tagIds, newTag.id]);
    }, [task, createTag, onChange]);

    const handleChange = useCallback(async (tags: Partial<Tag>[]) => {
        const newTagIds = tags.map(tag => tag.id).filter(id => id !== undefined) as string[];

        onChange(newTagIds);
    }, [onChange]);

    const handleRemove = useCallback(async (tag: Tag) => {
        onChange(task.tagIds.filter(id => id !== tag.id));
    }, [task, onChange]);

    return (
        <div>
            <TagsInput
                tags={task.tags}
                onAdd={handleAdd}
                onChange={handleChange}
                onRemove={handleRemove}
            />
        </div>
    );
}