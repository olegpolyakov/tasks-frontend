import { DateTime } from '@olegpolyakov/core';
import type { Task } from '@olegpolyakov/tasks-core';

export const filterNames: Record<string, string> = {
    all: 'All',
    important: 'Important',
    overdue: 'Over Due',
    inbox: 'Inbox',
    today: 'Today',
    next: 'Next'
};

export const filters: Record<string, (task: Task) => boolean> = {
    all: () => true,
    inbox: task => 
        !task.important &&
        !task.dueDate &&
        task.tagIds.length === 0,
    important: task => task.important,
    overdue: task =>
        !task.completed &&
        !!task.dueDate &&
        DateTime.fromISO(task.dueDate) < DateTime.now(),
    today: task => new Date(task.dueDate || '').toDateString() === new Date().toDateString(),
    next: task => {
        const today = DateTime.now();
        const tomorrow = today.plus({ 'days': 1 }).startOf('day');
        const endOfPeriod = today.plus({ 'days': 21 }).endOf('day');
        const dueDate = DateTime.fromISO(task.dueDate ?? '');

        return dueDate >= tomorrow && dueDate < endOfPeriod;
    }
};

export function filterTasks(
    tasks: Task[],
    filter: (task: Task) => boolean
) {
    return tasks.filter(filter);
}