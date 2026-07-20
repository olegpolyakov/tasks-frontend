import { SubmitEvent, useState } from 'react';

import { Input } from '@olegpolyakov/ui';

export default function TaskInput({ onSubmit }: { onSubmit?: (data: {title: string}) => void }) {
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