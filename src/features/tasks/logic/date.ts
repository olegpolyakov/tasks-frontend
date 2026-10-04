import { DateTime, toDateTime } from '@olegpolyakov/core';

const DATE_FORMAT = 'yyyy-MM-dd';
const DATETIME_FORMAT = 'yyyy-MM-dd\'T\'HH:mm';

export function hasTimeComponent(value: Date | string | number): boolean {
    const { hour, minute } = toDateTime(value);

    return hour !== 0 || minute !== 0;
}

/**
 * Formats a date for <input type="date"> or <input type="datetime-local"> in local time
 */
export function toInputValue(value: Date | string | number, hasTime: boolean): string {
    const dateTime = toDateTime(value);

    if (!dateTime.isValid) return '';

    return dateTime.toFormat(hasTime ? DATETIME_FORMAT : DATE_FORMAT);
}

/**
 * Parses an input value in local time; date-only values become local midnight
 */
export function fromInputValue(value: string, hasTime: boolean): Date | null {
    if (!value) return null;

    const dateTime = DateTime.fromFormat(value, hasTime ? DATETIME_FORMAT : DATE_FORMAT);

    return dateTime.isValid ? dateTime.toJSDate() : null;
}
