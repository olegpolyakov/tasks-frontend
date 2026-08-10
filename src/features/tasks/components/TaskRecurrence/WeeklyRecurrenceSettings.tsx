import { useMemo, useState } from 'react';

import { Box, Button, ButtonGroup, Flex, Input } from '@olegpolyakov/ui';
import { DateTime, Recurrence, RecurrenceData } from '@olegpolyakov/core/objects';

import Calendar from './Calendar';
import { daysOfWeek } from './constants';

export default function WeeklyRecurrenceSettings({
    date = new Date(),
    recurrence: data,
    onChange
}: {
    date?: Date;
    recurrence: RecurrenceData;
    onChange: (data: RecurrenceData) => void;
}) {
    const interval = data.interval ?? 1;

    const [selectedDays, setSelectedDays] = useState<number[]>(data?.values || []);

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

    const handleClick = (day: number) => {
        const newSelectedDays = selectedDays.includes(day)
            ? selectedDays.filter(d => d !== day)
            : [...selectedDays, day];

        setSelectedDays(newSelectedDays);
        onChange({
            ...data,
            values: newSelectedDays
        });
    };

    return (
        <Flex column gap="xs">
            <ButtonGroup joined>
                {daysOfWeek.map((day, index) => (
                    <Button
                        key={index}
                        content={day}
                        value={index}
                        color={selectedDays.includes(index) ? 'brand' : undefined}
                        variant={selectedDays.includes(index) ? 'filled' : 'plain'}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </ButtonGroup>

            <Input
                type="number"
                start="Every"
                value={interval}
                end={interval > 1 ? 'weeks' : 'week'}
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