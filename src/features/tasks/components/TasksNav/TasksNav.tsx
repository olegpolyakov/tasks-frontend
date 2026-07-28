import { NavLink } from 'react-router-dom';

import { Badge, Item, List } from '@olegpolyakov/ui';
import { useAppContext } from '@olegpolyakov/frontend/app';

import { useTasksContext } from '../../hooks';
import { filters } from '../../logic/filter';

export default function TasksNav() {
    const { closeDrawer } = useAppContext();
    const { tasks } = useTasksContext();

    const incompleteTasks = tasks.filter(t => !t.completed);
    const activeTasks = incompleteTasks.filter(t => t.active).length;
    const importantCount = incompleteTasks.filter(filters.important).length;
    const inboxCount = incompleteTasks.filter(filters.inbox).length;
    const overDueCount = incompleteTasks.filter(filters.overdue).length;
    const todayCount = incompleteTasks.filter(filters.today).length;    
    const nextCount = incompleteTasks.filter(filters.next).length;
    
    const items = [
        { to: '/inbox', content: 'Inbox', icon: 'inbox', count: inboxCount },
        { to: '/active', content: 'Active', icon: 'star', count: activeTasks },
        { to: '/important', content: 'Important', icon: 'flag', count: importantCount },
        { to: '/overdue', content: 'Over Due', icon: 'error', count: overDueCount },
        { to: '/today', content: 'Today', icon: 'today', count: todayCount },
        { to: '/next', content: 'Next', icon: 'event_upcoming', count: nextCount },
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