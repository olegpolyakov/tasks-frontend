import { useState } from 'react';

import type { Tag } from '@olegpolyakov/tasks-core';
import { Button, Flex, Input } from '@olegpolyakov/ui';
import EntityIcon from '@olegpolyakov/frontend/components/EntityIcon';

export default function TagForm({
    data,
    onSubmit
}: {
    data?: Partial<Tag>;
    onSubmit?: (data: Partial<Tag>) => void
}) {
    const [name, setName] = useState(data?.name || '');
    const [icon, setIcon] = useState(data?.icon || '');

    const submit = () => {
        onSubmit?.({ name, icon });
    };

    return (
        <Flex column gap="s">
            <Input
                label="Name"
                value={name}
                onChange={({ value }) => setName(value)}
            />

            <Input
                label="Icon"
                value={icon}
                end={icon && <EntityIcon icon={icon} />}
                onChange={({ value }) => setIcon(value)}
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