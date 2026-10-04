import { useCallback, useEffect, useState } from 'react';

import type { TaskData } from '@olegpolyakov/tasks-core';
import { Button, ButtonGroup, TreeItem } from '@olegpolyakov/ui';

import { TaskInput, TasksTree, useTaskContext, useTasksContext } from '@/features/tasks';
import { noop } from '@/utils';

import { useProjectContext } from '../../hooks';
import ProjectSection from '../ProjectSection';

import styles from './ProjectTasks.module.scss';

export default function ProjectTasks() {
    const {
        project,
        sections,
        tasks: projectTasks,
        addTask,
        updateProject
    } = useProjectContext();
    const { tasksById, toggleTask, updateTask } = useTasksContext();
    const { task: selectedTask, setTask } = useTaskContext();

    const [view, setView] = useState<'board' | 'list'>(() => {
        const savedView = localStorage.getItem(`tasks.projects.${project.id}.view`);
        return savedView === 'list' ? 'list' : 'board';
    });

    useEffect(() => {
        localStorage.setItem(`tasks.projects.${project.id}.view`, view);
    }, [view, project.id]);

    const handleToggle = useCallback((id: string, completed: boolean) => {
        toggleTask(id, completed).catch(noop);
    }, [toggleTask]);

    const handleUpdate = useCallback((id: string, data: Partial<TaskData>) => {
        updateTask(id, data).catch(noop);
    }, [updateTask]);

    const reorderTasks = useCallback((itemsInOrder: TreeItem[]) => {    
        itemsInOrder.forEach(updateTaskChildren);
        
        // clearSort();
        updateProject({ taskIds: itemsInOrder.map(i => i.id) });
        
        async function updateTaskChildren(item: TreeItem) {
            const task = tasksById[item.id];
        
            if (!task) return;
        
            const childrenIds = item.children.map(child => child.id);
        
            if (task.childrenIds.join(',') !== childrenIds.join(',')) {
                await updateTask(task.id, { childrenIds }).catch(noop);
            }
        
            item.children.forEach(updateTaskChildren);
        }    
    }, [updateProject, tasksById, updateTask]);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                {sections.length > 0 &&
                    <ButtonGroup>
                        <Button
                            icon="view_kanban"
                            content="Board"
                            active={view === 'board'}
                            onClick={() => setView('board')}
                        />

                        <Button
                            icon="view_list"
                            content="List"
                            active={view === 'list'}
                            onClick={() => setView('list')}
                        />
                    </ButtonGroup>
                }
            </div>

            <div className={styles.body}>
                <div className={styles.tasks}>
                    <TasksTree
                        tasks={projectTasks}
                        selectedTask={selectedTask}
                        hideProjects
                        onSelect={setTask}
                        onToggle={handleToggle}
                        onUpdate={handleUpdate}
                        onReorder={reorderTasks}
                    />

                    <TaskInput onSubmit={addTask} />
                </div>

                {sections.length > 0 &&
                    <div className={styles[view]}>
                        <div className={styles.content}>
                            {sections.map(section => (
                                <ProjectSection
                                    className={styles.section}
                                    key={section.id}
                                    section={section}
                                />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}