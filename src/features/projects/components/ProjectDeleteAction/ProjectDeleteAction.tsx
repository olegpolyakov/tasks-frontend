import { useState } from 'react';

import { Button, type ButtonProps, Checkbox, Dialog, Flex, Text } from '@olegpolyakov/ui';

import { useProjectContext } from '../../contexts';

export default function ProjectDeleteAction(props: ButtonProps) {
    const { deleteProject } = useProjectContext();

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [deleteTasks, setDeleteTasks] = useState(false);

    return (
        <>
            <Button
                title="Delete project"
                onClick={() => setDialogOpen(true)}
                {...props}
            />

            <Dialog
                open={isDialogOpen}
                title="Delete project"
                onClose={() => setDialogOpen(false)}
            >
                <Flex column gap="s">
                    <Text content="Are you sure you want to delete this project?" />

                    <Checkbox
                        label="Delete tasks?"
                        checked={deleteTasks}
                        onChange={() => setDeleteTasks(v => !v)}
                    />

                    <Button
                        content="Delete"
                        fluid
                        color="danger"
                        variant="tinted"
                        onClick={() => {
                            deleteProject({ deleteTasks });
                            setDialogOpen(false);
                        }}
                    />
                </Flex>
            </Dialog>
        </>
    );
}