import { TaskPriority as TaskPriorityEnum } from '@olegpolyakov/tasks-core';
import { Badge, Field, Pill, PillGroup } from '@olegpolyakov/ui';

import { useTranslation } from '@/i18n';

export default function TaskPriority({
    priority,
    onChange
}: {
    priority?: TaskPriorityEnum;
    onChange?: (priority: TaskPriorityEnum) => void
}) {
    const { t } = useTranslation();
    return (
        <Field label={t('priority')}>
            <PillGroup>
                <Pill
                    content={t('priority.low')}
                    start={<Badge color="success" />}
                    color={priority === TaskPriorityEnum.Low ? 'success' : undefined}
                    variant={priority === TaskPriorityEnum.Low ? 'outlined-tinted' : 'tinted'}
                    interactive
                    onClick={() => onChange?.(TaskPriorityEnum.Low)}
                />
                
                <Pill
                    content={t('priority.medium')}
                    start={<Badge color="brand" />}
                    color={priority === TaskPriorityEnum.Medium ? 'brand' : undefined}
                    variant={priority === TaskPriorityEnum.Medium ? 'outlined-tinted' : 'tinted'}
                    interactive
                    onClick={() => onChange?.(TaskPriorityEnum.Medium)}
                />

                <Pill
                    content={t('priority.high')}
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