import { describe, expect, test } from 'vitest';

import { fromInputValue, hasTimeComponent, toInputValue } from '@/features/tasks/logic/date';

describe('date input conversion', () => {
    test('date-only value round-trips as local midnight', () => {
        const date = fromInputValue('2026-10-05', false)!;

        expect(date.getFullYear()).toBe(2026);
        expect(date.getMonth()).toBe(9);
        expect(date.getDate()).toBe(5);
        expect(date.getHours()).toBe(0);
        expect(toInputValue(date, false)).toBe('2026-10-05');
    });

    test('datetime value round-trips using local time', () => {
        const date = fromInputValue('2026-10-05T09:30', true)!;

        expect(date.getHours()).toBe(9);
        expect(toInputValue(date, true)).toBe('2026-10-05T09:30');
    });

    test('returns null for empty or invalid values', () => {
        expect(fromInputValue('', false)).toBeNull();
        expect(fromInputValue('abc', true)).toBeNull();
        expect(toInputValue('abc', false)).toBe('');
    });

    test('detects time component', () => {
        expect(hasTimeComponent(new Date(2026, 9, 5))).toBe(false);
        expect(hasTimeComponent(new Date(2026, 9, 5, 9, 0))).toBe(true);
    });
});
