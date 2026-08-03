import { DateTime } from '@olegpolyakov/core';
import type { Task } from '@olegpolyakov/tasks-core';
import { isString } from '@olegpolyakov/core/utils/types';

export const filterNames: Record<string, string> = {
    all: 'All',
    active: 'Active',
    important: 'Important',
    inbox: 'Inbox',
    overdue: 'Over Due',
    today: 'Today',
    next: 'Next'
};

export const filters: Record<string, (task: Task) => boolean> = {
    all: () => true,
    active: task => task.active,
    important: task => task.important,
    inbox: task => 
        !task.active &&
        !task.important &&
        !task.dueDate &&
        !task.parent &&
        task.tagIds.length === 0 &&
        task.projects?.length === 0,
    overdue: task =>
        !task.completed &&
        !!task.dueDate &&
        (isString(task.dueDate)
            ? DateTime.fromISO(task.dueDate)
            : DateTime.fromJSDate(task.dueDate)
        ) < DateTime.now(),
    today: task => new Date(task.dueDate || '').toDateString() === new Date().toDateString(),
    next: task => {
        if (!task.dueDate) return false;

        const today = DateTime.now();
        const tomorrow = today.plus({ 'days': 1 }).startOf('day');
        const endOfPeriod = today.plus({ 'days': 21 }).endOf('day');
        const dueDate = isString(task.dueDate)
            ? DateTime.fromISO(task.dueDate)
            : DateTime.fromJSDate(task.dueDate);

        return dueDate >= tomorrow && dueDate < endOfPeriod;
    }
};

export function filterTasks(
    tasks: Task[],
    filter: (task: Task) => boolean
) {
    return tasks.filter(filter);
}