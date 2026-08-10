import { useCallback, useState } from 'react';

import { Button, Text } from '@olegpolyakov/ui';

import CalendarDay from './CalendarDay';
import { DAYS_IN_WEEK, getMonthName } from './helpers';

import styles from './Calendar.module.scss';

export type CalendarProps = {
  initialDate?: Date;
  compact?: boolean;
  isDisabled?: (data: Date) => boolean;
  hasEvents?: (data: Date) => boolean;
  onSelect?: (data: Date) => void;
  onMonthChange?: (monthIndex: number) => void;
};

export default function Calendar({
    initialDate = new Date(),
    compact,
    isDisabled: isDisabled = () => false,
    hasEvents = () => false,
    onSelect,
    onMonthChange
}: CalendarProps) {
    const [monthIndex, setMonthIndex] = useState<number>(initialDate.getMonth());
    const [year, setYear] = useState<number>(initialDate.getFullYear());
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

    const handlePrevMonth = useCallback(() => {
        let month = monthIndex - 1;
        if (monthIndex === 0) {
            month = 11;
            setYear(year - 1);
        }
        setMonthIndex(month);
        onMonthChange?.(month);
    }, [monthIndex, onMonthChange, year]);

    const handleNextMonth = useCallback(() => {
        let month = monthIndex + 1;
        if (monthIndex === 11) {
            month = 0;
            setYear(year + 1);
        }
        setMonthIndex(month);
        onMonthChange?.(month);
    }, [monthIndex, onMonthChange, year]);

    const handleDayClick = useCallback(
        (date: Date) => {
            setSelectedDate(date);
            onSelect?.(date);
        },
        [onSelect]
    );

    const isCurrentYear = new Date().getFullYear() === year;
    const firstDayOfWeek = new Date(year, monthIndex, 1).getDay();
    const size = compact ? 's' : undefined;

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Button
                    icon="chevron_left"
                    size={size}
                    onClick={handlePrevMonth}
                />

                <Text size={size}>
                    {getMonthName(monthIndex)} {!isCurrentYear && year}
                </Text>

                <Button
                    icon="chevron_right"
                    size={size}
                    onClick={handleNextMonth}
                />
            </div>

            <div className={styles.body}>
                {[...Array(6).keys()].map(weekIndex => (
                    <div
                        key={weekIndex}
                        className={styles.week}
                    >
                        {[...Array(DAYS_IN_WEEK).keys()].map(weekDay => {
                            const day = weekIndex * DAYS_IN_WEEK + weekDay + 2 - firstDayOfWeek;
                            const date = new Date(year, monthIndex, day);
                            const isSelected = new Date(selectedDate).setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0);
                            const isDateFromAnotherMonth = date.getMonth() !== monthIndex;

                            if (isDateFromAnotherMonth) {
                                return (
                                    <div
                                        key={date.toString()}
                                        className={styles.emptyDay}
                                    />
                                );
                            }

                            return (
                                <CalendarDay
                                    key={date.toString()}
                                    date={date}
                                    hasEvents={hasEvents(date)}
                                    disabled={isDisabled(date)}
                                    selected={isSelected}
                                    onSelect={handleDayClick}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
