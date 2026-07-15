import { type Task, TaskPriority } from '@olegpolyakov/tasks-core';
import { Badge, Box, Checkbox, Flex, Icon, Item, Pill, type PillProps, Text } from '@olegpolyakov/ui-components';

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
    selected,
    onSelect,
    onToggle,
    onDelete,
    ...props
}: {
    ref?: (element: Element | null) => void;
    task: Task;
    selected?: boolean;
    onSelect?: (task: Task) => void;
    onDelete?: (id: string) => void;
    onToggle?: (id: string, completed: boolean) => void;
}) {
    return (
        <Item
            shape="rounded-s"
            variant="plain"
            active={selected}
            interactive
            onClick={() => onSelect?.(task)}
            {...props}
        >
            <Flex column gap="xxs">
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
                                title="Priority"
                                color={priorityColors[task.priority] as PillProps['color']}
                                size="s"
                                variant="tinted"
                            />
                        )}

                        {task.dueDate && (
                            <Text
                                content={new Date(task.dueDate).toLocaleDateString()}
                                title="Due date"
                                color="secondary"
                                size="xs"
                            />
                        )}

                        {task.childrenIds.length > 0 &&
                            <Text
                                start={<Icon color="secondary" name="checklist" size="s" />}
                                content={task.childrenIds.length}
                                color="secondary"
                                size="xs"
                                title={`${task.childrenIds.length} subtasks`}
                            />
                        }

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
        </Item>
    );
}