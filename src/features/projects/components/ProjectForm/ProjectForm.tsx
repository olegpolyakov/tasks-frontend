import { useState } from 'react';

import type { Project } from '@olegpolyakov/tasks-core';
import { Button, Flex, Input, Textarea } from '@olegpolyakov/ui';

export default function ProjectForm({
    data,
    onSubmit
}: {
    data?: Partial<Project>;
    onSubmit?: (data: Partial<Project>) => void
}) {
    const [name, setName] = useState(data?.name || '');
    const [icon, setIcon] = useState(data?.icon || '');
    const [description, setDescription] = useState(data?.description || '');

    const submit = () => {
        onSubmit?.({
            name,
            icon,
            description
        });
    };

    return (
        <Flex column gap="s">
            <Input
                placeholder="Name"
                value={name}
                onChange={({ value }) => setName(value)}
            />

            <Input
                placeholder="Icon"
                value={icon}
                onChange={({ value }) => setIcon(value)}
            />

            <Textarea
                placeholder="Description"
                value={description}
                onChange={({ value = '' }) => setDescription(value)}
            />

            <Button
                content={data ? 'Update' : 'Create'}
                color="brand"
                variant="filled"
                onClick={submit}
            />
        </Flex>
    );
}