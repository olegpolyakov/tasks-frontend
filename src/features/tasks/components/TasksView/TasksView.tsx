import { type ReactNode, useCallback, useMemo } from 'react';

import { DateTime } from '@olegpolyakov/core';
import type { Task, TaskData } from '@olegpolyakov/tasks-core';
import { Button, ButtonGroup, Flex, Heading, HeadingProps, State, TreeItem } from '@olegpolyakov/ui';
import { useAppContext } from '@olegpolyakov/frontend/app';

import { useSettingsContext } from '@/features/settings';

import NoTasksImage from '../../assets/no-tasks.svg';
import { TaskInput, TasksSort, TasksTree } from '../../components';
import { useTaskContext, useTasksContext } from '../../hooks';
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
        tasksById,
        createTask,
        updateTask,
        toggleTask
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

    const handleSubmit = useCallback((data: Partial<TaskData>) => {
        switch (filter.name) {
            case 'important':
                data.important = true;
                break;
            case 'today':
                data.date = DateTime.now().endOf('day').toJSDate();
                break;
        }

        createTask(data);
    }, [filter, createTask]);

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
            const task = tasksById[item.id];

            if (!task) return;

            const childrenIds = item.children.map(child => child.id);

            if (task.childrenIds.join(',') !== childrenIds.join(',')) {
                await updateTask(task.id, { childrenIds });
            }

            item.children.forEach(updateTaskChildren);
        }        
    }, [updateSettings, settings.tasksOrder, id, updateTask, clearSort, tasksById]);
    
    const filteredAndSortedTasks = useMemo(() => {
        return sortTasks(filterTasks(Object.values(tasks) as Task[], filter), sort, settings.tasksOrder?.[id]);
    }, [tasks, filter, sort, settings.tasksOrder, id]);

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
                                tasks={filteredAndSortedTasks}
                                selectedTask={selectedTask}
                                onSelect={setTask}
                                onToggle={toggleTask}
                                onUpdate={updateTask}
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
                    <TaskInput onSubmit={handleSubmit} />
                </div>
            </div>

            <TaskView />
        </div>
    );
}