import { NavLink } from 'react-router-dom';

import { Badge, Item, List } from '@olegpolyakov/ui';
import { useAppContext } from '@olegpolyakov/frontend/app';

import { useTasksContext } from '../../contexts';
import { filters } from '../../logic/filter';

export default function TasksNav() {
    const { closeDrawer } = useAppContext();
    const { tasks } = useTasksContext();

    const incompleteTasks = tasks.filter(t => !t.completed);
    const inboxCount = incompleteTasks.filter(filters.inbox).length;
    const todayCount = incompleteTasks.filter(filters.today).length;    

    return (
        <List as="nav" gap="s">
            <NavLink to="/inbox">
                {({ isActive }) => (
                    <Item
                        icon="inbox"
                        content="Inbox"
                        end={
                            <Badge
                                content={inboxCount}
                                size="s"
                                variant="tinted"
                            />
                        }
                        variant="plain"
                        shape="rounded-s"
                        active={isActive}
                        interactive
                        onClick={closeDrawer}
                    />
                )}
            </NavLink>
            
            <NavLink to="/today">
                {({ isActive }) => (
                    <Item
                        icon="today"
                        content="Today"
                        end={
                            <Badge
                                content={todayCount}
                                size="s"
                                variant="tinted"
                            />
                        }
                        variant="plain"
                        shape="rounded-s"
                        active={isActive}
                        interactive
                        onClick={closeDrawer}
                    />
                )}
            </NavLink>

            <NavLink to="/all">
                {({ isActive }) => (
                    <Item
                        icon="done_all"
                        content="All"
                        end={
                            <Badge
                                content={tasks.length}
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
        </List>
    );
}