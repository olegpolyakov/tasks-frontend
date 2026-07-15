import { Task } from '@olegpolyakov/tasks-core';
import { SortableTree, type TreeItem } from '@olegpolyakov/ui-components';

import { buildTree } from '../../logic/children';
import TaskItem from '../TaskItem';

export default function TasksTree({
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
    onReorder: (items: TreeItem[]) => void;
}) {
    return (
        <SortableTree
            as="div"
            gap="s"
            items={buildTree(tasks)}
            renderItem={(item, sortable) => {
                const task = tasks.find(t => t.id === item.id);

                if (!task) return <></>;

                return (
                    <TaskItem
                        key={item.id}
                        ref={sortable.ref}
                        task={task}
                        selected={selectedTask?.id === item.id}
                        data-depth={item.depth}
                        onSelect={onSelect}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        aria-hidden={sortable.isDragSource}
                    />
                );
            }}
            renderOverlay={draggable => {
                const task = tasks.find(t => t.id === draggable.id);

                return task ? (
                    <TaskItem
                        task={task}
                    />
                ) : <></>;
            }}
            onChange={onReorder}
        />
    );
}