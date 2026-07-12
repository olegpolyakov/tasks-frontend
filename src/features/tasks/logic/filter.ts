import type { Task } from '@olegpolyakov/tasks-core';

export const filters: Record<string, (task: Task) => boolean> = {
    all: () => true,
    inbox: task => task.tagIds.length === 0,
    today: task => new Date(task.dueDate || '').toDateString() === new Date().toDateString()
};

export function filterTasks(
    tasks: Task[],
    filter: (task: Task) => boolean
) {
    return tasks.filter(filter);
}