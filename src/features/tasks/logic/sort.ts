import type { Task } from '@olegpolyakov/tasks-core';

export const filters: Record<string, (task: Task) => boolean> = {
    all: () => true,
    inbox: task => task.tagIds.length === 0,
    today: task => new Date(task.dueDate || '').toDateString() === new Date().toDateString()
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