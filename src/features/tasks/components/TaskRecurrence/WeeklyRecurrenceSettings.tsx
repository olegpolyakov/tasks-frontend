import { useState } from 'react';

import type { RecurrenceData } from '@olegpolyakov/core';
import { Button, ButtonGroup } from '@olegpolyakov/ui-components';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export function getWeeklyRecurrenceDescription(recurrence: RecurrenceData) {
    const interval = recurrence.interval || 1;
    const days = recurrence.values || [];
    
    if (days.length === 0) {
        return `Every ${interval > 1 ? interval : ''} week${interval > 1 ? 's' : ''}`;
    }

    const dayNames = days.map(day => daysOfWeek[day]);

    return `Every ${interval > 1 ? interval : ''} week${interval > 1 ? 's' : ''} on ${dayNames.join(', ')}`;
}

export default function WeeklyRecurrenceSettings({
    recurrence,
    onChange
}: {
    recurrence?: RecurrenceData;
    onChange: (days: number[]) => void;
}) {
    const [selectedDays, setSelectedDays] = useState<number[]>(recurrence?.values || []);

    const handleClick = (day: number) => {
        const newSelectedDays = selectedDays.includes(day)
            ? selectedDays.filter(d => d !== day)
            : [...selectedDays, day];

        setSelectedDays(newSelectedDays);
        onChange(newSelectedDays);
    };

    return (
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
    );
}