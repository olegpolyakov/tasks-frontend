import cn from 'classnames';

import styles from './CalendarDay.module.scss';

export type CalendarDayProps = {
  date: Date;
  hasEvents?: boolean;
  disabled?: boolean;
  selected?: boolean;
  onSelect?: (date: Date) => void;
};

export default function CalendarDay({
    date,
    hasEvents,
    disabled,
    selected,
    onSelect = () => {}
}: CalendarDayProps) {
    return (
        <div
            className={cn(styles.root, {
                [styles.disabled]: disabled,
                [styles.selected]: selected,
                [styles.hasEvents]: hasEvents
            })}
            onClick={() => !disabled && onSelect(date)}
        >
            {date.getDate()}
        </div>
    );
}
