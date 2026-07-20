import { useState } from 'react';
import { useMatch } from 'react-router-dom';

import { Button, Drawer } from '@olegpolyakov/ui';

import { Chat } from '@/features/ai';

import { filters } from '../logic/filter';
import { TaskProvider } from '../providers';
import { TasksView } from '../views';

const headings: Record<string, string> = {
    today: 'Today',
    inbox: 'Inbox',
    all: 'All'
};

export default function Tasks() {
    const { filter = 'all' } = useMatch('/:filter')?.params || {};

    const [isChatOpen, setChatOpen] = useState(false);

    return (
        <TaskProvider>
            <TasksView
                id={filter}
                heading={headings[filter] || 'Tasks'}
                filter={filters[filter] || filters.all}
                actions={
                    <Button
                        icon="chat"
                        title="Chat"
                        onClick={() => setChatOpen(true)}
                    />
                }
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
                <Chat />
            </Drawer>
        </TaskProvider>
    );
}