import { useState } from 'react';
import { useMatch } from 'react-router-dom';

import { Button, Drawer } from '@olegpolyakov/ui';

import { Chat } from '@/features/ai';

import { TasksView } from '../components';
import { filterNames, filters } from '../logic/filter';
import { TaskProvider } from '../providers';

export default function Tasks() {
    const { filter = 'all' } = useMatch('/:filter')?.params || {};

    const [isChatOpen, setChatOpen] = useState(false);

    return (
        <TaskProvider>
            <TasksView
                id={filter}
                heading={filterNames[filter] ?? 'Tasks'}
                filter={filters[filter] ?? filters.all}
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