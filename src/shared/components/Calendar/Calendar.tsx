import { useCallback, useState } from 'react';

import CalendarDay from './CalendarDay';
import { DAYS_IN_WEEK, getMonthName, noop } from './utils';

import styles from './Calendar.module.scss';

export type CalendarProps = {
  initialDate?: Date;
  isDisabled?: (data: Date) => boolean;
  hasEvents?: (data: Date) => boolean;
  onSelect?: (data: Date) => void;
  onMonthChange?: (monthIndex: number) => void;
};

export default function Calendar({
    initialDate = new Date(),
    isDisabled: isDisabled = () => false,
    hasEvents = () => false,
    onSelect = noop,
    onMonthChange = noop
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
        onMonthChange(month);
    }, [monthIndex, onMonthChange, year]);

    const handleNextMonth = useCallback(() => {
        let month = monthIndex + 1;
        if (monthIndex === 11) {
            month = 0;
            setYear(year + 1);
        }
        setMonthIndex(month);
        onMonthChange(month);
    }, [monthIndex, onMonthChange, year]);

    const handleDayClick = useCallback(
        (date: Date) => {
            setSelectedDate(date);
            onSelect(date);
        },
        [onSelect]
    );

    const isCurrentYear = new Date().getFullYear() === year;
    const firstDayOfWeek = new Date(year, monthIndex, 1).getDay();

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <button
                    className={styles.prevButton}
                    onClick={handlePrevMonth}
                />

                <div className={styles.monthName}>
                    {getMonthName(monthIndex)} {!isCurrentYear && year}
                </div>

                <button
                    className={styles.nextButton}
                    onClick={handleNextMonth}
                />
            </div>

            <div className={styles.body}>
                {[...Array(6).keys()].map(weekIndex => (
                    <div
                        className={styles.week}
                        key={weekIndex}
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
                                    date={date}
                                    key={date.toString()}
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
