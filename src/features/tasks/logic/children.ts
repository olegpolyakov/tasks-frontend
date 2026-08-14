import { Task } from '@olegpolyakov/tasks-core';

export function buildTree(tasks: Task[]): Task[] {
    for (const task of tasks) {
        if (!task.hasChildren) continue;

        task.children = task.childrenIds.map(id => {
            const child = tasks.find(t => t.id === id);

            if (!child) return;

            child.parent = task;

            return child;
        }).filter(Boolean) as Task[];
    }

    return tasks;
}

export function getAllChildren(
    taskId: string,
    tasks: Record<string, Task>,
    filter: (task: Task) => boolean = () => true
): Task[] {
    const task = tasks[taskId];

    if (!task) throw new Error('Task is not found');

    const children = task.childrenIds
        .map(id => tasks[id])
        .filter(task => !!task && filter(task));

    return [
        ...children,
        ...children.flatMap(t => getAllChildren(t.id, tasks))
    ];
}