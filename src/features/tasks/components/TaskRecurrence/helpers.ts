import { type RecurrenceData, RecurrenceFrequency } from '@olegpolyakov/core/objects';

import { daysOfWeek } from './constants';

export function getDailyRecurrenceDescription(recurrence: RecurrenceData) {
    const interval = recurrence.interval || 1;

    return `Every ${interval > 1 ? interval : ''} day${interval > 1 ? 's' : ''}`;
}

export function getMonthlyRecurrenceDescription(recurrence: RecurrenceData) {
    const interval = recurrence.interval || 1;

    return `Every ${interval > 1 ? interval : ''} month${interval > 1 ? 's' : ''}`;
}

export function getWeeklyRecurrenceDescription(recurrence: RecurrenceData) {
    const interval = recurrence.interval || 1;
    const days = recurrence.values || [];
    
    if (days.length === 0) {
        return `Every ${interval > 1 ? interval : ''} week${interval > 1 ? 's' : ''}`;
    }

    const dayNames = days.map(day => daysOfWeek[day]);

    return `Every ${interval > 1 ? interval : ''} week${interval > 1 ? 's' : ''} on ${dayNames.join(', ')}`;
}

export function getYearlyRecurrenceDescription(recurrence: RecurrenceData) {
    const interval = recurrence.interval || 1;

    return `Every ${interval > 1 ? interval : ''} year${interval > 1 ? 's' : ''}`;
}

export const getRecurrenceDescription = {
    [RecurrenceFrequency.Daily]: getDailyRecurrenceDescription,
    [RecurrenceFrequency.Weekly]: getWeeklyRecurrenceDescription,
    [RecurrenceFrequency.Monthly]: getMonthlyRecurrenceDescription,
    [RecurrenceFrequency.Yearly]: getYearlyRecurrenceDescription
};