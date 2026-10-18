import { useMatch } from 'react-router-dom';

import { useTranslation } from '@/i18n';

import { TasksView } from '../components';
import { filters } from '../logic/filter';
import { TaskProvider } from '../providers';

export default function Tasks() {
    const { filter = 'all' } = useMatch('/:filter')?.params || {};
    const { t } = useTranslation();

    return (
        <TaskProvider>
            <TasksView
                id={filter}
                heading={t(filter) ?? t('tasks')}
                filter={filters[filter] ?? filters.all}
            />
        </TaskProvider>
    );
}