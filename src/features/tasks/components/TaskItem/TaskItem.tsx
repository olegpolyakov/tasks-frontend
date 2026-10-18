import { Link } from 'react-router-dom';

import type { Task, TaskData } from '@olegpolyakov/tasks-core';
import { Button, Checkbox, Flex, Icon, Item, Pill, Text } from '@olegpolyakov/ui';
import { capitalize } from '@olegpolyakov/core/utils/string';
import EntityIcon from '@olegpolyakov/frontend/components/EntityIcon';

import { useTranslation } from '@/i18n';

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
    const { t } = useTranslation();
    

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
                <Flex
                    align="center"
                    gap="xxs"
                >
                    {task.isOverdue &&
                        <Icon
                            name="priority_high"
                            title={t('overdue')}
                        />
                    }

                    <Button
                        icon={<Icon
                            name="flag"
                            filled={task.important}
                        />}
                        title={task.important
                            ? t('important.unset')
                            : t('important.set')
                        }
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
                            title={t('dueDate')}
                            color={task.isOverdue ? 'danger' : 'secondary'}
                            size="xs"
                        />
                    )}

                    {task.recurrence && (
                        <Text
                            className={styles.dueDate}
                            start={<Icon
                                color="secondary"
                                name="autorenew"
                                size="s"
                            />}
                            color="secondary"
                            content={getRecurrenceDescription[task.recurrence.frequency]?.(task.recurrence)}
                            title={t('recurrence')}
                            size="xs"
                        />
                    )}

                    {task.childrenIds.length > 0 &&
                            <Text
                                start={
                                    <Icon
                                        color="secondary"
                                        name="checklist"
                                        size="s"
                                    />
                                }
                                content={task.childrenIds.length}
                                title={t('subtasks', { count: task.childrenIds.length })}
                                color="secondary"
                                size="xs"
                            />
                    }

                    {task.content && (
                        <Icon
                            title={t('tasks.hasContent')}
                            name="notes"
                            color="secondary"
                            size="s"
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
                            title={`${t('project')}: ${project.name}`}
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
                            title={`${t('tag')}: ${tag.name}`}
                            interactive
                            onClick={event => event.stopPropagation()}
                        />
                    )}
                </div>
            </div>
        </Item>
    );
}