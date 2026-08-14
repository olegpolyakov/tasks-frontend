import { type RecurrenceData, RecurrenceFrequency } from '@olegpolyakov/core';
import type { Task } from '@olegpolyakov/tasks-core';
import { Button, Field, Popover, Select, Text } from '@olegpolyakov/ui';

import { frequencyOptions } from './constants';
import DailyRecurrenceSettings from './DailyRecurrenceSettings';
import { getRecurrenceDescription } from './helpers';
import MonthlyRecurrenceSettings from './MonthlyRecurrenceSettings';
import WeeklyRecurrenceSettings from './WeeklyRecurrenceSettings';
import YearlyRecurrenceSettings from './YearlyRecurrenceSettings';

const frequencySettingsComponents = {
    [RecurrenceFrequency.Daily]: DailyRecurrenceSettings,
    [RecurrenceFrequency.Weekly]: WeeklyRecurrenceSettings,
    [RecurrenceFrequency.Monthly]: MonthlyRecurrenceSettings,
    [RecurrenceFrequency.Yearly]: YearlyRecurrenceSettings
};

export default function TaskRecurrence({
    task,
    onChange
}: {
    task: Task;
    onChange?: (recurrence: RecurrenceData) => void
}) {
    const recurrence = task.recurrence;
    const RecurrenceSettings = recurrence
        ? frequencySettingsComponents[recurrence.frequency]
        : null;

    return (
        <Field label="Recurrence">
            <Select
                value={recurrence?.frequency ?? ''}
                options={frequencyOptions}
                end={recurrence && (
                    <div onClick={event => event.stopPropagation()}>
                        <Popover
                            placement="bottom-end"
                            size="m"
                            trigger={
                                <Button
                                    icon={{
                                        name: 'settings',
                                        size: 's'
                                    }}
                                    size="s"
                                />
                            }
                        >
                            {RecurrenceSettings && (
                                <RecurrenceSettings
                                    date={task.date}
                                    recurrence={recurrence}
                                    onChange={data => onChange?.(data)}
                                />
                            )}
                        </Popover>
                    </div>
                )}
                // @ts-ignore TODO Allow null value
                onChange={({ value }) =>  onChange?.(value ? {
                    frequency: value as RecurrenceFrequency,
                    interval: 1,
                    values: recurrence?.frequency === value
                        ? recurrence?.values
                        : []
                } : null)}
            />

            {recurrence && (
                <Text
                    content={getRecurrenceDescription[recurrence.frequency](recurrence)}
                    color="secondary"
                    size="s"
                />
            )}
        </Field>
    );
}