import { useState } from 'react';

import type { Task } from '@olegpolyakov/tasks-core';
import { Button, Checkbox, Field, Heading, Input, Text, Textarea } from '@olegpolyakov/ui-components';
import Editable from '@olegpolyakov/frontend/components/Editable';

import { TaskTags } from '../../components';
import TaskPriority from '../TaskPriority';
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
                <TaskPriority
                    priority={task.priority}
                    onChange={priority => onUpdate(task.id, { priority })}
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
                            <Button
                                title={hasTime ? 'Remove time' : 'Add time'}
                                icon={hasTime ? 'alarm_off' : 'alarm'}
                                size="s"
                                onClick={() => setHasTime(!hasTime)}
                            />
                        }
                        onChange={({ value }) => onUpdate(task.id, { dueDate: new Date(value) })}
                    />
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