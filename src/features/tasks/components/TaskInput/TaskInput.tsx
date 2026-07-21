import { SubmitEvent, useState } from 'react';

import type { TaskData } from '@olegpolyakov/tasks-core';
import { Input } from '@olegpolyakov/ui';

export default function TaskInput({ onSubmit }: { onSubmit?: (data: Partial<TaskData>) => void }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTitle('');
        onSubmit?.({ title });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                placeholder="New task"
                value={title}
                variant="outlined-tinted"
                onChange={({ value }) => setTitle(value)}
            />
        </form>
    );
}