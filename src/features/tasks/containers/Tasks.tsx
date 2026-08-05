import { useMatch } from 'react-router-dom';

import { TasksView } from '../components';
import TaskChat from '../components/TaskChat/TaskChat';
import { filterNames, filters } from '../logic/filter';
import { TaskProvider } from '../providers';

export default function Tasks() {
    const { filter = 'all' } = useMatch('/:filter')?.params || {};

    return (
        <TaskProvider>
            <TasksView
                id={filter}
                heading={filterNames[filter] ?? 'Tasks'}
                filter={filters[filter] ?? filters.all}
                actions={<TaskChat />}
            />
        </TaskProvider>
    );
}