import { DateTime, Recurrence, RecurrenceData } from '@olegpolyakov/core';

import Calendar from './Calendar';

export default function MonthlyRecurrenceSettings({
    recurrence: data,
    onChange
}: {
    recurrence: RecurrenceData;
    onChange: (data: RecurrenceData) => void;
}) {
    const today = new Date();
    const recurrence = Recurrence.create(data);
    const nextDate = recurrence.calculateNextDate(today);

    return (
        <Calendar
            initialDate={today}
            hasEvents={date => DateTime.fromJSDate(nextDate).hasSame(DateTime.fromJSDate(date), 'day')}
            compact
        />
    );
}