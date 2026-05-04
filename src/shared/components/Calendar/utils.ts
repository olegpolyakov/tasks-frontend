export const DAYS_IN_WEEK = 7;

export const noop = () => {};

export function daysInMonth(fullYear: number, monthIndex: number): number {
    return new Date(fullYear, monthIndex + 1, 0).getDate();
}

export function getMonthName(
    monthIndex: number,
    monthFormat: 'long' | 'numeric' | '2-digit' | 'short' | 'narrow' | undefined = 'long',
    locale = 'ru-RU'
): string {
    const applyFormat = new Intl.DateTimeFormat(locale, {
        month: monthFormat,
        timeZone: 'UTC'
    }).format;

    return applyFormat(new Date(Date.UTC(0, monthIndex)));
}

export function getMonthWeeksCount(fullYear: number, monthIndex: number): number {
    const firstDayOfWeek = new Date(fullYear, monthIndex, 1).getDay();

    return Math.ceil((daysInMonth(fullYear, monthIndex) + firstDayOfWeek) / DAYS_IN_WEEK);
};
