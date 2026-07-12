import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

import type { Task } from '@olegpolyakov/tasks-core';
import { List } from '@olegpolyakov/ui-components';

import TaskItem from '../TaskItem';

export default function TasksList({
    tasks,
    selectedTask,
    onSelect,
    onToggle,
    onDelete,
    onReorder
}: {
    tasks: Task[];
    selectedTask?: Task;
    onSelect: (task: Task) => void;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
    onReorder?: (tasks: Task[]) => void;
}) {
    const handleDragEnd = (event: DragEndEvent) => {
        if (event.canceled) return;

        const { source } = event.operation;

        if (isSortable(source)) {
            const { initialIndex, index } = source;

            if (initialIndex !== index) {
                const newTasks = tasks.slice();
                const [removed] = newTasks.splice(initialIndex, 1);
                newTasks.splice(index, 0, removed);
                
                onReorder?.(newTasks);
            }
        }
    };

    return (
        <DragDropProvider
            onDragEnd={handleDragEnd}
        >
            <List
                as="div"
                gap="s"
                shape="rounded-m"
                variant="plain"
                interactive
            >
                {tasks.map((task, index) => (
                    <TaskItem
                        key={task.id}
                        task={task as unknown as Task}
                        index={index}
                        selected={selectedTask?.id === task.id}
                        onSelect={onSelect}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </List>
        </DragDropProvider>
    );
}