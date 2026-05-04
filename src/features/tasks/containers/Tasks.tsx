import { useMatch } from 'react-router-dom';

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

    return (
        <TaskProvider>
            <TasksView
                id={filter}
                heading={headings[filter] || 'Tasks'}
                filter={filters[filter] || filters.all}
            />
        </TaskProvider>
    );
}