import { type RecurrenceData, RecurrenceFrequency } from '@olegpolyakov/core';
import { Button, Field, Popover, Select, Text } from '@olegpolyakov/ui-components';

import DailyRecurrenceSettings, { getDailyRecurrenceDescription } from './DailyRecurrenceSettings';
import MonthlyRecurrenceSettings, { getMonthlyRecurrenceDescription } from './MonthlyRecurrenceSettings';
import WeeklyRecurrenceSettings, { getWeeklyRecurrenceDescription } from './WeeklyRecurrenceSettings';
import YearlyRecurrenceSettings, { getYearlyRecurrenceDescription } from './YearlyRecurrenceSettings';

const frequencySettingsComponents = {
    [RecurrenceFrequency.Daily]: DailyRecurrenceSettings,
    [RecurrenceFrequency.Weekly]: WeeklyRecurrenceSettings,
    [RecurrenceFrequency.Monthly]: MonthlyRecurrenceSettings,
    [RecurrenceFrequency.Yearly]: YearlyRecurrenceSettings
};

const frequencyLabels: Record<RecurrenceFrequency, string> = {
    [RecurrenceFrequency.Daily]: 'Daily',
    [RecurrenceFrequency.Weekly]: 'Weekly',
    [RecurrenceFrequency.Monthly]: 'Monthly',
    [RecurrenceFrequency.Yearly]: 'Yearly'
};

const frequencyDescriptions = {
    [RecurrenceFrequency.Daily]: getDailyRecurrenceDescription,
    [RecurrenceFrequency.Weekly]: getWeeklyRecurrenceDescription,
    [RecurrenceFrequency.Monthly]: getMonthlyRecurrenceDescription,
    [RecurrenceFrequency.Yearly]: getYearlyRecurrenceDescription
};

const frequencyOptions = Object.entries(frequencyLabels).map(([value, label]) => ({
    key: value,
    value: value as RecurrenceFrequency,
    label
}));

export default function TaskRecurrence({
    recurrence,
    onChange
}: {
    recurrence?: RecurrenceData;
    onChange?: (recurrence: RecurrenceData) => void
}) {
    const RecurrenceSettings = recurrence ? frequencySettingsComponents[recurrence.frequency] : null;

    return (
        <Field label="Recurrence">
            <Select
                value={recurrence?.frequency}
                options={frequencyOptions}
                onChange={({ value }) =>  onChange?.({
                    frequency: value as RecurrenceFrequency,
                    interval: 1,
                    values: recurrence?.frequency === value
                        ? recurrence?.values
                        : []
                })}
                end={recurrence && (
                    <div onClick={event => event.stopPropagation()}>
                        <Popover
                            placement="bottom-end"
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
                                    recurrence={recurrence}
                                    onChange={values => onChange?.({
                                        ...recurrence,
                                        values
                                    })}
                                />
                            )}
                        </Popover>
                    </div>
                )}
            />

            {recurrence && (
                <Text
                    content={frequencyDescriptions[recurrence.frequency](recurrence)}
                    size="s"
                    color="secondary"
                />
            )}
        </Field>
    );
}