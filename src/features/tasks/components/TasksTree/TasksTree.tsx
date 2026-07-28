import { useMemo } from 'react';

import { Task, type TaskData } from '@olegpolyakov/tasks-core';
import { SortableTree, type TreeItem } from '@olegpolyakov/ui';

import { buildTree } from '../../logic/children';
import TaskItem from '../TaskItem';

export default function TasksTree({
    tasks,
    selectedTask,
    hideProjects,
    hideTags,
    onSelect,
    onToggle,
    onUpdate,
    onReorder
}: {
    tasks: Task[];
    selectedTask?: Task;
    hideProjects?: boolean;
    hideTags?: boolean;
    onSelect: (task: Task) => void;
    onToggle: (id: string, completed: boolean) => void;
    onUpdate: (id: string, data: Partial<TaskData>) => void;
    onReorder: (items: TreeItem[]) => void;
}) {
    const key = useMemo(() => {
        return tasks
            .map(task => `${task.id}:${task.childrenIds.join('.')}`)
            .join('|');
    }, [tasks]);

    return (
        <div>
            <SortableTree
                key={key}
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
                            hideProjects={hideProjects}
                            hideTags={hideTags}
                            data-depth={item.depth}
                            onSelect={onSelect}
                            onToggle={onToggle}
                            onUpdate={onUpdate}
                            aria-hidden={sortable.isDragSource}
                        />
                    );
                }}
                renderOverlay={draggable => {
                    const task = tasks.find(t => t.id === draggable.id);

                    return task ? (
                        <TaskItem
                            task={task}
                            hideProjects={hideProjects}
                            hideTags={hideTags}
                        />
                    ) : <></>;
                }}
                onChange={onReorder}
            />
        </div>
    );
}