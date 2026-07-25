import { useState } from 'react';

import { DateTime } from '@olegpolyakov/core';
import type { Task } from '@olegpolyakov/tasks-core';
import { Button, ButtonGroup, Checkbox, Field, Heading, Input, Pill, PillGroup, Switch, Text, Textarea } from '@olegpolyakov/ui';
import Editable from '@olegpolyakov/frontend/components/Editable';

import { TaskTags } from '../../components';
import TaskRecurrence from '../TaskRecurrence';

import styles from './TaskDetails.module.scss';

export default function TaskDetails({
    task,
    onUpdate
}: {
    task: Task;
    onUpdate: (id: string, data: Partial<Task>) => void;
}) {
    const [content, setContent] = useState(task.content || '');
    const [hasTime, setHasTime] = useState(false);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Heading
                    start={
                        <Checkbox
                            checked={task.completed}
                            onChange={({ checked }) => onUpdate(task.id, { completed: checked })}
                        />
                    }
                    content={
                        <Editable
                            content={task.title}
                            onBlur={title => onUpdate(task.id, { title })}
                        />
                    }
                    size="s"
                />
            </div>

            <div className={styles.content}>
                <Switch
                    label="Important"
                    checked={task.important}
                    onChange={({ checked }) => onUpdate(task.id, { important: checked })}
                />

                <Field label="Due Date">
                    <Input
                        type={hasTime ? 'datetime-local' : 'date'}
                        value={!task.dueDate
                            ? ''
                            : hasTime
                                ? new Date(task.dueDate).toISOString().slice(0, 16)
                                : new Date(task.dueDate).toISOString().slice(0, 10)
                        }
                        end={
                            <ButtonGroup gap="s">
                                <Button
                                    title={hasTime ? 'Remove time' : 'Add time'}
                                    icon={hasTime ? 'alarm_off' : 'alarm'}
                                    size="s"
                                    onClick={() => setHasTime(!hasTime)}
                                />

                                <Button
                                    title="Clear"
                                    icon="clear"
                                    size="s"
                                    // @ts-ignore Allow null as a value
                                    onClick={() => onUpdate(task.id, { dueDate: null })}
                                />
                            </ButtonGroup>
                        }
                        onChange={({ value }) => onUpdate(task.id, { dueDate: new Date(value) })}
                    />

                    {!task.dueDate &&
                        <PillGroup size="s" interactive>
                            <Pill
                                content="Today"
                                onClick={() => onUpdate(task.id, { dueDate: DateTime.now().toISODate() })}
                            />

                            <Pill
                                content="Tomorrow"
                                onClick={() => onUpdate(task.id, { dueDate: DateTime.now().plus({ days: 1 }).toISODate() })}
                            />

                            <Pill
                                content="Next week"
                                onClick={() => onUpdate(task.id, { dueDate: DateTime.now().endOf('week').plus({ days: 1 }).toISODate() })}
                            />
                        </PillGroup>
                    }
                </Field>

                <TaskRecurrence
                    recurrence={task.recurrence}
                    onChange={recurrence => onUpdate(task.id, { recurrence })}
                />

                <TaskTags
                    task={task}
                    onChange={tagIds => onUpdate(task.id, { tagIds })}
                />
                
                <Field label="Description">
                    <Textarea
                        value={content}
                        onChange={({ value = '' }) => setContent(value)}
                        onBlur={() => onUpdate(task.id, { content })}
                    />
                </Field>

                {task.createdAt && (
                    <Text
                        content={`Created: ${new Date(task.createdAt).toLocaleDateString()}`}
                        size="xs"
                        color="secondary"
                    />
                )}
            </div>
        </div>
    );
}