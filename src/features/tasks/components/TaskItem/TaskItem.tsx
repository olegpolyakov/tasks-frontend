import { useSortable } from '@dnd-kit/react/sortable';
import { Badge, Box, Checkbox, Flex, Icon, Item, Pill, type PillProps,Text } from 'kantanui';

import { type Task, TaskPriority } from '@olegpolyakov/tasks-core';

const priorityColors = {
    [TaskPriority.Low]: 'success',
    [TaskPriority.Medium]: 'brand',
    [TaskPriority.High]: 'danger'
};

const priorityLabels = {
    [TaskPriority.Low]: 'Low',
    [TaskPriority.Medium]: 'Medium',
    [TaskPriority.High]: 'High'
};

export default function TaskItem({
    task,
    index,
    selected,
    onSelect,
    onToggle,
    ...props
}: {
    task: Task;
    index: number;
    selected: boolean;
    onSelect: (task: Task) => void;
    onToggle: (id: string, completed: boolean) => void;
}) {
    const { ref } = useSortable({ id: task.id, index });
    
    return (
        <Item
            ref={ref}
            content={
                <Flex column gap="xxs">
                    <Text
                        as="span"
                        start={
                            <Checkbox
                                checked={task.completed}
                                onChange={() => onToggle(task.id, !task.completed)}
                                onClick={event => event.stopPropagation()}
                            />
                        }
                        content={task.title}
                        color={task.completed ? 'tertiary' : 'primary'}
                        strikethrough={task.completed}
                    />

                    <Box style={{ marginLeft: '1.75rem' }}>
                        <Flex gap="xs">
                            {task.priority !== undefined && (
                                <Pill
                                    start={
                                        <Badge
                                            color={priorityColors[task.priority] as PillProps['color']}
                                            size="s"
                                        />
                                    }
                                    content={priorityLabels[task.priority]}
                                    color={priorityColors[task.priority] as PillProps['color']}
                                    size="s"
                                    variant="tinted"
                                />
                            )}

                            {task.dueDate && (
                                <Text
                                    content={new Date(task.dueDate).toLocaleDateString()}
                                    size="xs"
                                    color="secondary"
                                />
                            )}

                            {task.content && (
                                <Icon
                                    title={task.content.length > 100 ? task.content.slice(0, 100) + '...' : task.content}
                                    name="notes"
                                    size="s"
                                    color="secondary"
                                />
                            )}
                        </Flex>
                    </Box>
                </Flex>
            }
            shape="rounded-s"
            variant="plain"
            active={selected}
            onClick={() => onSelect(task)}
            {...props}
        />
    );
}