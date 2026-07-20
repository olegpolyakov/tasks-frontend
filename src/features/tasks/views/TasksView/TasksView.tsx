import { type ReactNode, useCallback, useMemo } from 'react';

import type { Task } from '@olegpolyakov/tasks-core';
import { Button, ButtonGroup, Flex, Heading, HeadingProps, State, TreeItem } from '@olegpolyakov/ui';
import { useAppContext } from '@olegpolyakov/frontend/app';

import { useSettingsContext } from '@/features/settings';

import NoTasksImage from '../../assets/no-tasks.svg';
import { TaskInput, TasksSort } from '../../components';
import TasksTree from '../../components/TasksTree';
import { useTaskContext, useTasksContext } from '../../contexts';
import { useTasksSort } from '../../hooks';
import { filters, filterTasks } from '../../logic/filter';
import { sortTasks } from '../../logic/sort';
import TaskView from '../TaskView';

import styles from './TasksView.module.scss';

export default function TasksView({
    id,
    heading = 'Tasks',
    actions,
    filter = filters.all
}: {
    id: string;
    heading?: string | HeadingProps;
    actions?: ReactNode;
    filter?: (task: Task) => boolean;
}) {
    const { openDrawer } = useAppContext();
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

    const reorderTasks = useCallback((itemsInOrder: TreeItem[]) => {
        updateSettings({
            tasksOrder: {
                ...settings.tasksOrder,
                [id]: itemsInOrder.map(item => item.id)
            }
        });

        itemsInOrder.forEach(updateTaskChildren);

        clearSort();

        async function updateTaskChildren(item: TreeItem) {
            const task = tasks.find(t => t.id === item.id);

            if (!task) return;

            const childrenIds = item.children.map(child => child.id);

            if (task.childrenIds.join(',') !== childrenIds.join(',')) {
                await updateTask(task.id, { childrenIds });
            }

            item.children.forEach(updateTaskChildren);
        }        
    }, [updateSettings, settings.tasksOrder, id, updateTask, clearSort, tasks]);
    
    const filteredAndSortedTasks = useMemo(() => {
        return sortTasks(filterTasks(tasks, filter), sort, settings.tasksOrder?.[id]);
    }, [tasks, filter, sort, settings.tasksOrder, id]);
    const tasksTreeKey = useMemo(() => {
        return filteredAndSortedTasks
            .map(task => `${task.id}:${task.childrenIds.join('.')}`)
            .join('|');
    }, [filteredAndSortedTasks]);

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <div className={styles.header}>
                    <Flex align="center" gap="m">
                        <Button
                            className={styles.menu}
                            icon="menu"
                            onClick={openDrawer}
                        />
                    
                        <Heading
                            {...(typeof heading === 'string' ? { content: heading } : heading)}
                        />
                    </Flex>

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
                                key={tasksTreeKey}
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