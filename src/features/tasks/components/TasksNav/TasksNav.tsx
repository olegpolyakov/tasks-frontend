import { NavLink } from 'react-router-dom';

import { Badge, Item, List } from '@olegpolyakov/ui';
import { useAppContext } from '@olegpolyakov/frontend/app';

import { useTasksContext } from '../../contexts';
import { filters } from '../../logic/filter';

export default function TasksNav() {
    const { closeDrawer } = useAppContext();
    const { tasksList  } = useTasksContext();

    const incompleteTasks = tasksList.filter(t => !t.completed);
    const inboxCount = incompleteTasks.filter(filters.inbox).length;
    const importantCount = incompleteTasks.filter(filters.important).length;
    const overDueCount = incompleteTasks.filter(filters.overdue).length;
    const todayCount = incompleteTasks.filter(filters.today).length;    
    const nextCount = incompleteTasks.filter(filters.next).length;
    
    const items = [
        { to: '/inbox', content: 'Inbox', icon: 'inbox', count: inboxCount },
        { to: '/important', content: 'Important', icon: 'flag', count: importantCount },
        { to: '/overdue', content: 'Over Due', icon: 'priority_high', count: overDueCount },
        { to: '/today', content: 'Today', icon: 'today', count: todayCount },
        { to: '/next', content: 'Next', icon: 'event_upcoming', count: nextCount },
        { to: '/all', content: 'All', icon: 'done_all', count: tasksList.length }
    ];

    return (
        <List as="nav" gap="s">
            {items.map(item =>
                <NavLink key={item.to} to={item.to}>
                    {({ isActive }) => (
                        <Item
                            icon={item.icon}
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