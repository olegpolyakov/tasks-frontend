import { NavLink } from 'react-router-dom';

import { Badge, Item, List } from '@olegpolyakov/ui-components';
import { useAppContext } from '@olegpolyakov/frontend/app';
import EntityIcon from '@olegpolyakov/frontend/components/EntityIcon';

import { useTasksContext } from '@/features/tasks';

import { useTagsContext } from '../../contexts';

import styles from './TagsNav.module.scss';

export default function TagsNav() {
    const { closeDrawer } = useAppContext();
    const { tasks } = useTasksContext();
    const { tags } = useTagsContext();

    return (
        <List className={styles.root} gap="s">
            {tags.map(tag => (
                <NavLink
                    key={tag.id}
                    className={styles.item}
                    to={`/tags/${tag.id}`}
                >
                    {({ isActive }) => (
                        <Item
                            key={tag.id}
                            start={<EntityIcon icon={tag.icon || 'tag'} />}
                            content={tag.name}
                            end={
                                <Badge
                                    content={tasks.filter(task => task.tagIds?.includes(tag.id)).length}
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
            ))}
        </List>
    );
}
