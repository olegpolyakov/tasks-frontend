import { type ReactNode, useCallback, useMemo } from 'react';

import type { Task } from '@olegpolyakov/tasks-core';
import { Button, ButtonGroup, Flex, Heading, type HeadingProps, State } from '@olegpolyakov/ui-components';

import { useSettingsContext } from '@/features/settings';

import NoTasksImage from '../../assets/no-tasks.svg';
import TasksTree from '../../components/TasksTree';
import { useTaskContext, useTasksContext } from '../../contexts';
import { filterAndSortTasks } from '../../helpers';
import { useTasksSort } from '../../hooks';
import TaskView from '../TaskView';

import styles from './TasksView.module.scss';

const defaultFilter = () => true;

export default function TasksView({
    id,
    heading = 'Tasks',
    actions,
    filter = defaultFilter
}: {
    id: string;
    heading?: string | HeadingProps;
    actions?: ReactNode;
    filter?: (task: Task) => boolean;
}) {
    const {
        tasks,
        createTask,
        updateTask,
        toggleTask,
        deleteTask
    } = useTasksContext();
    const {
        task: selectedTask,
        setTask
    } = useTaskContext();
    const { settings, updateSettings } = useSettingsContext();
    const {
        sort,
        sortKey,
        sortDir,
        changeSortKey,
        toggleSortDir,
        clearSort
    } = useTasksSort(id);

    const reorderTasks = useCallback((tasksInOrder: Task[]) => {
        updateSettings({
            tasksOrder: {
                ...settings.tasksOrder,
                [id]: tasksInOrder.map(task => task.id)
            }
        });

        tasksInOrder.forEach(updateTaskChildren);

        clearSort();

        async function updateTaskChildren(task: Task) {
            const childrenIds = task.children.map(t => t.id);

            if (task.childrenIds.join(',') !== childrenIds.join(',')) {
                await updateTask(task.id, { childrenIds });
            }

            task.children.forEach(updateTaskChildren);
        }        
    }, [updateSettings, settings.tasksOrder, id, updateTask, clearSort]);
    
    const tasksKey = useMemo(() => tasks.map(t => t.id).join(','), [tasks]);

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <div className={styles.header}>
                    <Heading
                        {...(typeof heading === 'string' ? { content: heading } : heading)}
                    />

                    <div className={styles.actions}>
                        <ButtonGroup gap="s">
                            <TasksSort
                                sortKey={sortKey}
                                sortDir={sortDir}
                                onSortKeyChange={changeSortKey}
                                onSortDirChange={toggleSortDir}
                                onClear={clearSort}
                            />

                            {actions}
                        </ButtonGroup>
                    </div>
                </div>
                
                <div className={styles.body}>
                    {filteredAndSortedTasks.length > 0 ?
                        <div className={styles.content}>
                            <TasksTree
                                key={tasksKey}
                                tasks={filteredAndSortedTasks}
                                selectedTask={selectedTask}
                                onSelect={setTask}
                                onToggle={toggleTask}
                                onDelete={deleteTask}
                                onReorder={reorderTasks}
                            />
                        </div>
                        :
                        <State
                            className={styles.empty}
                            image={<NoTasksImage />}
                            title="No tasks"
                            description="You don't have any tasks yet. Create your first task to get started!"
                        />
                    }
                </div>
            
                <div className={styles.footer}>
                    <TaskInput onSubmit={createTask} />
                </div>
            </div>

            <TaskView />
        </div>
    );
}