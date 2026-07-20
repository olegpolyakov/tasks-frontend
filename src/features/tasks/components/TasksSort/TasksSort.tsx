import { Button, ButtonGroup, Icon, Menu } from '@olegpolyakov/ui';

const sortNames: Record<string, string> = {
    dueDate: 'Due date',
    priority: 'Priority',
    createdAt: 'Created at'
};

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
    return sortKey ? (
        <ButtonGroup
            color="brand"
            variant="tinted"
            joined
        >
            <Button
                title="Toggle sorting direction"
                icon="sort"
                content={sortNames[sortKey]}
                end={sortDir > 0
                    ? <Icon name="arrow_upward_alt" />
                    : <Icon name="arrow_downward_alt" />
                }
                onClick={() => onSortDirChange(sortDir * -1)}
            />

            <Button
                title="Clear sorting"
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
                    title="Sort tasks"
                    icon="sort"
                    content={sortNames[sortKey]}
                />
            }
            placement="bottom-end"
            items={[
                {
                    content: 'Due date',
                    value: 'dueDate',
                    onClick: () => onSortKeyChange('dueDate')
                },
                {
                    content: 'Priority',
                    value: 'priority',
                    onClick: () => onSortKeyChange('priority')
                },
                {
                    content: 'Created at',
                    value: 'createdAt',
                    onClick: () => onSortKeyChange('createdAt')
                }
            ]}
        />
    );
}