import { useState } from 'react';

import { Button, type ButtonProps, Checkbox, Dialog, Flex, Text } from '@olegpolyakov/ui';

import { useTagsContext } from '../../hooks';

export default function TagDeleteAction({
    tagId,
    onDeleted,
    ...props
}: {
    tagId: string;
    onDeleted?: (tagId: string) => void;
} & ButtonProps) {
    const { deleteTag } = useTagsContext();

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleDelete = () => {
        deleteTag(tagId);
        setDialogOpen(false);
        onDeleted?.(tagId);
    };

    return (<>
        <Button
            title="Delete tag"
            onClick={() => setDialogOpen(true)}
            {...props}
        />

        <Dialog
            open={isDialogOpen}
            title="Delete tag"
            onClose={() => setDialogOpen(false)}
        >
            <Flex column gap="s">
                <Text content="Are you sure you want to delete this tag?" />

                <Button
                    content="Delete"
                    fluid
                    color="danger"
                    variant="tinted"
                    onClick={handleDelete}
                />
            </Flex>
        </Dialog>
    </>);
}