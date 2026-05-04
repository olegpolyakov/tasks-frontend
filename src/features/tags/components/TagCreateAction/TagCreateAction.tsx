import { useCallback, useState } from 'react';

import { Button, type ButtonProps,Dialog } from 'kantanui';

import type { Tag } from '@olegpolyakov/tasks/core';

import { useTagsContext } from '../../contexts';
import TagForm from '../TagForm';

export default function TagCreateAction(props: ButtonProps) {
    const { createTag } = useTagsContext();

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleSubmit = useCallback(async (data: Partial<Tag>) => {
        await createTag(data);
        setDialogOpen(false);
    }, [createTag]);

    return (<>
        <Button
            title="Create a tag"
            onClick={() => setDialogOpen(true)}
            {...props}
        />

        <Dialog
            title="New tag"
            open={isDialogOpen}
            onClose={() => setDialogOpen(false)}
        >
            <TagForm onSubmit={handleSubmit} />
        </Dialog>
    </>);
}