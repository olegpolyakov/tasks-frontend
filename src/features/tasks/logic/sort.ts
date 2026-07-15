import type { Task } from '@olegpolyakov/tasks-core';

export type Sorts = Record<string, (a: Task, b: Task) => number>;

export const sorts: Sorts =  {
    dueDate: (a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    },
    priority: (a, b) => b.priority - a.priority,
    createdAt: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
};

export function sortTasks(
    tasks: Task[],
    sort?: (a: Task, b: Task) => number,
    taskIdsInOrder?: string[]
) {
    if (sort) return tasks.toSorted(sort);

    if (!taskIdsInOrder || taskIdsInOrder.length === 0) return tasks;

    const tasksIds = tasks.map(task => task.id);
    const tasksById = new Map(tasks.map(task => [task.id, task]));
    const tasksInOrder = taskIdsInOrder
        .filter(id => tasksIds.includes(id))
        .map(id => tasksById.get(id)).filter(Boolean) as Task[];
    const remainingTasks = tasks.filter(task => !taskIdsInOrder.includes(task.id));
    
    return [...tasksInOrder, ...remainingTasks];
}