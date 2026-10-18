import { Button, ButtonGroup, Icon, Menu } from '@olegpolyakov/ui';

import { useTranslation } from '@/i18n';

export default function TasksSort({
    sortKey,
    sortDir,
    onSortKeyChange,
    onSortDirChange,
    onClear
}: {
    sortKey: string;
    sortDir: number;
    onSortKeyChange: (key: string) => void;
    onSortDirChange: (dir: number) => void;
    onClear?: () => void;
}) {
    const { t } = useTranslation();

    return sortKey ? (
        <ButtonGroup
            color="brand"
            variant="tinted"
            joined
        >
            <Button
                title={t('sort.toggleDir')}
                icon="sort"
                content={t(sortKey)}
                end={sortDir > 0
                    ? <Icon name="arrow_upward_alt" />
                    : <Icon name="arrow_downward_alt" />
                }
                onClick={() => onSortDirChange(sortDir * -1)}
            />

            <Button
                title={t('sort.clear')}
                icon={{
                    name: 'close', 
                    size: 's'
                }}
                onClick={onClear}
            />
        </ButtonGroup>
    ) : (
        <Menu
            trigger={
                <Button
                    content={t(sortKey)}
                    icon="sort"
                    title={t('sort')}
                />
            }
            placement="bottom-end"
            items={[
                {
                    content: t('dueDate'),
                    value: 'dueDate',
                    onClick: () => onSortKeyChange('dueDate')
                },
                {
                    content: t('createdAt'),
                    value: 'createdAt',
                    onClick: () => onSortKeyChange('createdAt')
                }
            ]}
        />
    );
}