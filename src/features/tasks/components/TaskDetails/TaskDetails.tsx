import { useState } from 'react';

import { DateTime } from '@olegpolyakov/core';
import type { Task, TaskData } from '@olegpolyakov/tasks-core';
import { Button, ButtonGroup, Field, Flex, Input, Pill, PillGroup, Text } from '@olegpolyakov/ui';
import EntityIcon from '@olegpolyakov/frontend/components/EntityIcon';

import { TaskTags } from '../../components';
import TaskContent from '../TaskContent';
import TaskRecurrence from '../TaskRecurrence';

import styles from './TaskDetails.module.scss';

export default function TaskDetails({
    task,
    onUpdate
}: {
    task: Task;
    onUpdate: (id: string, data: Partial<TaskData>) => void;
}) {
    const [hasTime, setHasTime] = useState(false);

    return (
        <div className={styles.root}>
            <PillGroup>
                <Pill
                    content="Active"
                    icon={{
                        name: 'star',
                        filled: task.active
                    }}
                    color={task.active ? 'brand' : undefined}
                    variant={task.active ? 'filled' : 'tinted'}
                    interactive
                    onClick={() => onUpdate(task.id, { active: !task.active })}
                />

                <Pill
                    content="Important"
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
                                onClick={() => onUpdate(task.id, { dueDate: null as unknown as undefined })}
                            />
                        </ButtonGroup>
                    }
                    onChange={({ value }) => onUpdate(task.id, { dueDate: new Date(value) })}
                />

                {!task.dueDate &&
                        <PillGroup size="s" interactive>
                            <Pill
                                content="Today"
                                onClick={() => onUpdate(task.id, { dueDate: DateTime.now().toJSDate() })}
                            />

                            <Pill
                                content="Tomorrow"
                                onClick={() => onUpdate(task.id, { dueDate: DateTime.now().plus({ days: 1 }).toJSDate() })}
                            />

                            <Pill
                                content="Next week"
                                onClick={() => onUpdate(task.id, { dueDate: DateTime.now().endOf('week').plus({ days: 1 }).toJSDate() })}
                            />
                        </PillGroup>
                }
            </Field>

            <TaskRecurrence
                task={task}
                onChange={recurrence => onUpdate(task.id, { recurrence })}
            />

            <Field label="Projects">
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

            <TaskContent />

            <Flex gap="s">
                {task.createdAt && (
                    <Text
                        content={`Created: ${DateTime.fromJSDate(new Date(task.createdAt)).toLocaleString()}`}
                        size="xs"
                        color="secondary"
                    />
                )}

                {task.updatedAt && (
                    <Text
                        content={`Updated: ${DateTime.fromJSDate(new Date(task.updatedAt)).toLocaleString()}`}
                        size="xs"
                        color="secondary"
                    />
                )}
            </Flex>
        </div>
    );
}