import { useState } from 'react';

import { Button, Drawer } from '@olegpolyakov/ui';

import { Chat } from '@/features/ai';

import { useTaskContext } from '../../hooks';

export default function TaskChat() {
    const { task } = useTaskContext();

    const [isChatOpen, setChatOpen] = useState(false);

    const prompt = task ? `Current task ID: ${task.id}` : '';

    return (
        <>
            <Button
                icon="chat"
                title="Chat"
                onClick={() => setChatOpen(true)}
            />
            
            <Drawer
                title="AI Chat"
                position="right"
                size="m"
                type="modal"
                open={isChatOpen}
                closeOnClickOutside
                onClose={() => setChatOpen(false)}
            >
                <Chat prompt={prompt} />
            </Drawer>
        </>
    );
}