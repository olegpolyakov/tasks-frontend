import { Button, Field, Pill, PillGroup, Popover, Select } from 'kantanui';

import { type TaskRecurrence, TaskRecurrenceFrequency } from '@olegpolyakov/tasks/core';

export default function TaskRecurrence({
    recurrence,
    onChange
}: {
    recurrence?: TaskRecurrence;
    onChange?: (recurrence: TaskRecurrence) => void
}) {
    return (
        <Field label="Recurrence">
            <Select
                options={[
                    {
                        value: TaskRecurrenceFrequency.Daily,
                        label: 'Daily'
                    },
                    {
                        value: TaskRecurrenceFrequency.Weekly,
                        label: 'Weekly'
                    },
                    {
                        value: TaskRecurrenceFrequency.Monthly,
                        label: 'Monthly'
                    },
                    {
                        value: TaskRecurrenceFrequency.Yearly,
                        label: 'Yearly'
                    }
                ]}
                value={recurrence?.frequency}
                onChange={({ value }) => {
                    if (!value) return;

                    onChange?.({
                        frequency: value as TaskRecurrenceFrequency,
                        interval: 1
                    });
                }}
                end={recurrence && (
                    <div onClick={event => {
                        event.stopPropagation();
                    }}>
                        <Popover
                            placement="bottom-end"
                            trigger={
                                <Button
                                    icon={{
                                        name: 'settings',
                                        size: 's'
                                    }}
                                
                                />
                            }
                        >
                            <PillGroup>
                                <Pill content="Пн" />
                                <Pill content="Вт" />
                                <Pill content="Ср" />
                                <Pill content="Чт" />
                                <Pill content="Пт" />
                                <Pill content="Сб" />
                                <Pill content="Вс" />
                            </PillGroup>
                        </Popover>
                    </div>
                )}
            />
        </Field>
    );
}