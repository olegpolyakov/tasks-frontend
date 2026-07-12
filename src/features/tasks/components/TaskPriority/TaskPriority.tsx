import { TaskPriority as TaskPriorityEnum } from '@olegpolyakov/tasks-core';
import { Badge, Field, Pill, PillGroup } from '@olegpolyakov/ui-components';

export default function TaskPriority({
    priority,
    onChange
}: {
    priority?: TaskPriorityEnum;
    onChange?: (priority: TaskPriorityEnum) => void
}) {
    return (
        <Field label="Priority">
            <PillGroup>
                <Pill
                    content="Low"
                    start={<Badge color="success" />}
                    color={priority === TaskPriorityEnum.Low ? 'success' : undefined}
                    variant={priority === TaskPriorityEnum.Low ? 'outlined-tinted' : 'tinted'}
                    interactive
                    onClick={() => onChange?.(TaskPriorityEnum.Low)}
                />
                
                <Pill
                    content="Medium"
                    start={<Badge color="brand" />}
                    color={priority === TaskPriorityEnum.Medium ? 'brand' : undefined}
                    variant={priority === TaskPriorityEnum.Medium ? 'outlined-tinted' : 'tinted'}
                    interactive
                    onClick={() => onChange?.(TaskPriorityEnum.Medium)}
                />

                <Pill
                    content="High"
                    start={<Badge color="danger" />}
                    color={priority === TaskPriorityEnum.High ? 'danger' : undefined}
                    variant={priority === TaskPriorityEnum.High ? 'outlined-tinted' : 'tinted'}
                    interactive
                    onClick={() => onChange?.(TaskPriorityEnum.High)}
                />
            </PillGroup>
        </Field>
    );
}