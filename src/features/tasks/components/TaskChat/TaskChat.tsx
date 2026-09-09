import { useState } from 'react';

import { Button, Drawer } from '@olegpolyakov/ui';
import { GuestGuard } from '@olegpolyakov/frontend/features/auth';

import { AI_URL } from '@/env';
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
                title="AI Assistant"
                position="right"
                size="m"
                type="modal"
                open={isChatOpen}
                scrollable
                closeOnClickOutside
                onClose={() => setChatOpen(false)}
            >
                <GuestGuard>
                    <Chat
                        url={AI_URL}
                        prompt={prompt}
                    />
                </GuestGuard>
            </Drawer>
        </>
    );
}