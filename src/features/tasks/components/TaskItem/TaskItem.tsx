import { Link } from 'react-router-dom';

import type { Task, TaskData } from '@olegpolyakov/tasks-core';
import { Button, Checkbox, Flex, Icon, Item, Pill, Text } from '@olegpolyakov/ui';
import { capitalize } from '@olegpolyakov/core/utils/string';
import EntityIcon from '@olegpolyakov/frontend/components/EntityIcon';

import { getRecurrenceDescription } from '../TaskRecurrence';

import styles from './TaskItem.module.scss';

export default function TaskItem({
    task,
    selected,
    onSelect,
    onToggle,
    onUpdate,
    hideProjects,
    hideTags,
    ...props
}: {
    ref?: (element: Element | null) => void;
    task: Task;
    selected?: boolean;
    hideProjects?: boolean;
    hideTags?: boolean;
    onSelect?: (task: Task) => void;
    onToggle?: (id: string, completed: boolean) => void;
    onUpdate?: (id: string, data: Partial<TaskData>) => void;
}) {
    const dateTimeString = task.dateTimeString;
    const color = task.isOverdue
        ? 'danger'
        : undefined;
    const variant = (task.isOverdue || selected)
        ? 'tinted'
        : 'plain';
    
    return (
        <Item
            shape="rounded-s"
            color={color}
            variant={variant}
            active={selected}
            interactive
            end={
                <Flex align="center" gap="xxs">
                    {task.isOverdue && <Icon name="priority_high" title="Over due" />}

                    <Button
                        icon={<Icon name="flag" filled={task.important} />}
                        title={task.important ? 'Remove from important' : 'Add to important'}
                        onClick={event => {
                            event.stopPropagation();
                            onUpdate?.(task.id, { important: !task.important });
                        }}
                    />
                </Flex>
            }
            onClick={() => onSelect?.(task)}
            {...props}
        >
            <div className={styles.content}>
                <Text
                    as="span"
                    start={
                        <Checkbox
                            checked={task.completed}
                            onChange={() => onToggle?.(task.id, !task.completed)}
                            onClick={event => event.stopPropagation()}
                        />
                    }
                    content={task.title}
                    color={task.completed ? 'tertiary' : 'primary'}
                    strikethrough={task.completed}
                />

                <div className={styles.details}>
                    {dateTimeString && (
                        <Text
                            className={styles.dueDate}
                            content={capitalize(dateTimeString)}
                            title="Due date"
                            color={task.isOverdue ? 'danger' : 'secondary'}
                            size="xs"
                        />
                    )}

                    {task.recurrence && (
                        <Text
                            className={styles.dueDate}
                            start={<Icon color="secondary" name="autorenew" size="s" />}
                            color="secondary"
                            content={getRecurrenceDescription[task.recurrence.frequency]?.(task.recurrence)}
                            title="Recurrence"
                            size="xs"
                        />
                    )}

                    {task.childrenIds.length > 0 &&
                            <Text
                                start={<Icon color="secondary" name="checklist" size="s" />}
                                content={task.childrenIds.length}
                                title={`${task.childrenIds.length} subtasks`}
                                color="secondary"
                                size="xs"
                            />
                    }

                    {task.content && (
                        <Icon
                            title="Task has content"
                            name="notes"
                            size="s"
                            color="secondary"
                        />
                    )}

                    {!hideProjects && task.projects.map(project => 
                        <Pill
                            className={styles.link}
                            key={project.id}
                            as={Link}
                            to={`/projects/${project.id}`}
                            content={project.name}
                            start={project.icon && <EntityIcon icon={project.icon} />}
                            size="s"
                            variant="tinted"
                            title={`Project: ${project.name}`}
                            interactive
                            onClick={event => event.stopPropagation()}
                        />
                    )}

                    {!hideTags && task.tags.map(tag => 
                        <Pill
                            className={styles.link}
                            key={tag.id}
                            as={Link}
                            to={`/tags/${tag.id}`}
                            start={<EntityIcon icon={tag.icon || 'tag'} />}
                            content={tag.name}
                            size="s"
                            variant="tinted"
                            title={`Tag: ${tag.name}`}
                            interactive
                            onClick={event => event.stopPropagation()}
                        />
                    )}
                </div>
            </div>
        </Item>
    );
}