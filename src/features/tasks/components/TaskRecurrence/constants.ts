import { RecurrenceFrequency } from '@olegpolyakov/core';

export const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const frequencyLabels: Record<RecurrenceFrequency, string> = {
    [RecurrenceFrequency.Daily]: 'Daily',
    [RecurrenceFrequency.Weekly]: 'Weekly',
    [RecurrenceFrequency.Monthly]: 'Monthly',
    [RecurrenceFrequency.Yearly]: 'Yearly'
};

export const frequencyOptions = Object.entries(frequencyLabels).map(([value, label]) => ({
    key: value,
    value: value as RecurrenceFrequency,
    label
}));