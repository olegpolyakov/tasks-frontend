import { useMemo } from 'react';

import { Flex, Input } from '@olegpolyakov/ui';
import { DateTime, Recurrence, RecurrenceData } from '@olegpolyakov/core/objects';

import Calendar from './Calendar';

export default function YearlyRecurrenceSettings({
    date = new Date(),
    recurrence: data,
    onChange
}: {
    date?: Date;
    recurrence: RecurrenceData;
    onChange: (data: RecurrenceData) => void;
}) {
    const interval = data.interval ?? 1;
    const dates = useMemo(() => {
        const recurrence = Recurrence.create(data);
        const endOfMonth = DateTime.now().endOf('month');
        let currentDate = DateTime.fromJSDate(date).startOf('day');
        const map: Record<string, Date> = {};

        while (currentDate < endOfMonth) {
            const jsDate = currentDate.toJSDate();
            map[jsDate.toISOString()] = jsDate;
            currentDate = DateTime.fromJSDate(recurrence.calculateNextDate(currentDate.toJSDate()));
        }

        return map;
    }, [date, data]);

    return (
        <Flex column gap="xs">
            <Input
                type="number"
                start="Every"
                value={interval}
                end={interval > 1 ? 'years' : 'year'}
                min={1}
                onChange={({ value }) => onChange({
                    ...data,
                    interval: Number(value)
                })}
            />
        
            <Calendar
                hasEvents={date => {
                    const key = DateTime.fromJSDate(date).startOf('day').toJSDate().toISOString();
        
                    return key in dates;
                }}
                compact
            />
        </Flex>
    );
}