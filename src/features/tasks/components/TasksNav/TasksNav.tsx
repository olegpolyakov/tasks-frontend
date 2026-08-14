import { NavLink } from 'react-router-dom';

import { Badge, Item, List } from '@olegpolyakov/ui';
import { useAppContext } from '@olegpolyakov/frontend/app';

import { useTasksContext } from '../../hooks';
import { filters } from '../../logic/filter';

export default function TasksNav() {
    const { tasks } = useTasksContext();
    const { closeDrawer } = useAppContext();

    const incompleteTasks = tasks.filter(t => !t.completed);
    const inboxCount = incompleteTasks.filter(filters.inbox).length;
    const importantCount = incompleteTasks.filter(filters.important).length;
    const currentTasks = incompleteTasks.filter(t => t.isCurrent).length;
    const nextCount = incompleteTasks.filter(filters.next).length;
    const overDueCount = incompleteTasks.filter(filters.overdue).length;
    const todayCount = incompleteTasks.filter(filters.today).length;    
    
    const items = [
        { to: '/inbox', content: 'Inbox', icon: 'inbox', count: inboxCount },
        { to: '/important', content: 'Important', icon: 'flag', count: importantCount },
        { to: '/today', content: 'Today', icon: 'today', count: todayCount },
        { to: '/current', content: 'Current', icon: 'mode_standby', count: currentTasks },
        { to: '/next', content: 'Next', icon: 'event_upcoming', count: nextCount },
        { to: '/overdue', content: 'Over Due', icon: 'error', count: overDueCount },
        { to: '/all', content: 'All', icon: 'done_all', count: tasks.length }
    ];

    return (
        <List as="nav" gap="s">
            {items.map(item =>
                <NavLink key={item.to} to={item.to}>
                    {({ isActive }) => (
                        <Item
                            icon={{
                                name: item.icon,
                                size: 'm',
                                filled: isActive
                            }}
                            content={item.content}
                            end={
                                <Badge
                                    content={item.count}
                                    size="s"
                                    variant="tinted"
                                />
                            }
                            shape="rounded-s"
                            variant="plain"
                            active={isActive}
                            interactive
                            onClick={closeDrawer}
                        />
                    )}
                </NavLink>
            )}
        </List>
    );
}