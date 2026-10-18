import { type ReactNode, useState } from 'react';

import { DateTime } from '@olegpolyakov/core';
import type { Task, TaskData } from '@olegpolyakov/tasks-core';
import { Button, ButtonGroup, Field, Flex, Input, Pill, PillGroup, Text } from '@olegpolyakov/ui';
import EntityIcon from '@olegpolyakov/frontend/components/EntityIcon';

import { useTranslation } from '@/i18n';

import { TaskTags } from '../../components';
import { fromInputValue, hasTimeComponent, toInputValue } from '../../logic/date';
import TaskContent from '../TaskContent';
import TaskFiles from '../TaskFiles';
import TaskRecurrence from '../TaskRecurrence';

import styles from './TaskDetails.module.scss';

export default function TaskDetails({
    task,
    children,
    onUpdate
}: {
    task: Task;
    children?: ReactNode;
    onUpdate: (id: string, data: Partial<TaskData>) => void;
}) {
    const { t } = useTranslation();

    const [hasTime, setHasTime] = useState(() => !!task.date && hasTimeComponent(task.date));

    return (
        <div className={styles.root}>
            <PillGroup>
                <Pill
                    content={t('important')}
                    icon={{
                        name: 'flag',
                        filled: task.important
                    }}
                    color={task.important ? 'brand' : undefined}
                    variant={task.important ? 'filled' : 'tinted'}
                    interactive
                    onClick={() => onUpdate(task.id, { important: !task.important })}
                />
            </PillGroup>

            <Field label={t('dueDate')}>
                <Input
                    type={hasTime ? 'datetime-local' : 'date'}
                    value={task.date ? toInputValue(task.date, hasTime) : ''}
                    end={
                        <ButtonGroup gap="s">
                            <Button
                                title={hasTime ? t('time.remove') : t('time.add')}
                                icon={hasTime ? 'alarm_off' : 'alarm'}
                                size="s"
                                onClick={() => setHasTime(!hasTime)}
                            />

                            <Button
                                title={t('dueDate.clear')}
                                icon="clear"
                                size="s"
                                onClick={() => onUpdate(task.id, { date: null as unknown as undefined })}
                            />
                        </ButtonGroup>
                    }
                    onChange={({ value }) => {
                        const date = fromInputValue(value, hasTime);

                        if (date) onUpdate(task.id, { date });
                    }}
                />

                {!task.date &&
                    <PillGroup
                        size="s"
                        interactive
                    >
                        <Pill
                            content={t('today')}
                            onClick={() => onUpdate(task.id, {
                                date: DateTime.now().startOf('day').toJSDate()
                            })}
                        />

                        <Pill
                            content={t('tomorrow')}
                            onClick={() => onUpdate(task.id, {
                                date: DateTime.now().startOf('day').plus({ days: 1 }).toJSDate()
                            })}
                        />

                        <Pill
                            content={t('nextWeek')}
                            onClick={() => onUpdate(task.id, {
                                date: DateTime.now().startOf('week').plus({ weeks: 1 }).toJSDate()
                            })}
                        />
                    </PillGroup>
                }
            </Field>

            <TaskRecurrence
                task={task}
                onChange={recurrence => onUpdate(task.id, { recurrence })}
            />

            <TaskContent />

            <Field label={t('projects')}>
                {task.projects?.map(project => 
                    <Pill
                        key={project.id}
                        start={project.icon && <EntityIcon icon={project.icon} />}
                        content={project.name}
                        variant="tinted"
                    />
                )}
            </Field>

            <TaskTags
                task={task}
                onChange={tagIds => onUpdate(task.id, { tagIds })}
            />

            <TaskFiles
                task={task}
                onChange={refs => onUpdate(task.id, { refs })}
            />

            <Flex gap="s">
                {task.createdAt && (
                    <Text
                        content={`${t('createdAt')}: ${DateTime.fromJSDate(new Date(task.createdAt)).toLocaleString()}`}
                        color="secondary"
                        size="xs"
                    />
                )}

                {task.updatedAt && (
                    <Text
                        content={`${t('updatedAt')}: ${DateTime.fromJSDate(new Date(task.updatedAt)).toLocaleString()}`}
                        color="secondary"
                        size="xs"
                    />
                )}
            </Flex>

            {children}
        </div>
    );
}