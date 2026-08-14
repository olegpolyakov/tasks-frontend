import type { Task } from '@olegpolyakov/tasks-core';

export const filterNames: Record<string, string> = {
    all: 'All',
    current: 'Current',
    important: 'Important',
    inbox: 'Inbox',
    next: 'Next',
    overdue: 'Over Due',
    today: 'Today'
};

export const filters: Record<string, (task: Task) => boolean> = {
    all: () => true,
    current: task => task.isCurrent,
    important: task => task.important,
    inbox: task => 
        !task.important &&
        !task.date &&
        !task.hasParent &&
        !task.hasTags &&
        !task.hasProjects,
    next: task => task.isNext,
    overdue: task => task.isOverdue,
    today: task => task.isDueToday
};

export function filterTasks(
    tasks: Task[],
    filter: (task: Task) => boolean
) {
    return tasks.filter(filter);
}