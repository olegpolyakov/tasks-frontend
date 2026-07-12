import { useCallback, useState } from 'react';

import type { Tag } from '@olegpolyakov/tasks-core';
import { Button, type ButtonProps, Dialog } from '@olegpolyakov/ui-components';

import { TagForm } from '../..';
import { useTagContext, useTagsContext } from '../../contexts';

export default function TagEditAction({ tagId, ...props }: { tagId?: string } & ButtonProps) {
    const { tags, updateTag } = useTagsContext();
    const { setTag } = useTagContext();

    const tag = tags.find(t => t.id === tagId);

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleSubmit = useCallback(async (data: Partial<Tag>) => {
        if (!tag) throw new Error('Tag not found');

        const updatedTag = await updateTag(tag.id, data);
        setTag(updatedTag);
        setDialogOpen(false);
    }, [tag, updateTag, setTag]);

    return (<>
        <Button
            title="Edit tag"
            icon="edit"
            onClick={() => setDialogOpen(true)}
            {...props}
        />

        <Dialog
            title={`Edit tag: ${tag?.name}`}
            open={isDialogOpen}
            onClose={() => setDialogOpen(false)}
        >
            <TagForm
                data={tag}
                onSubmit={handleSubmit}
            />
        </Dialog>
    </>);
}