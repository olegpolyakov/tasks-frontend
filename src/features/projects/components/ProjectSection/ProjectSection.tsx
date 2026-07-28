import { useCallback } from 'react';

import type { ProjectSectionData, Task, TaskData } from '@olegpolyakov/tasks-core';
import { Box, Button, Menu, type TreeItem } from '@olegpolyakov/ui';
import Editable from '@olegpolyakov/frontend/components/Editable';
import classnames from '@olegpolyakov/frontend/helpers/classnames';

import { TaskInput, TasksTree, useTaskContext, useTasksContext } from '@/features/tasks';

import { useProjectContext } from '../../hooks';

import styles from './ProjectSection.module.scss';

export default function ProjectSection({
    section,
    className
}: {
    section: ProjectSectionData,
    className?: string,
}) {
    const {
        addTask,
        updateSection,
        deleteSection
    } = useProjectContext();
    const { tasksById, updateTask, toggleTask } = useTasksContext();
    const { task: selectedTask, setTask } = useTaskContext();

    const handleSubmit = useCallback((data: Partial<TaskData>) => {
        addTask(data, section.id);
    }, [addTask, section.id]);

    const handleDelete = useCallback(() => {
        if (!confirm(
            'Are you sure you want to delete the section?' +
            (section.taskIds.length > 0 ? ` ${section.taskIds.length} will also be deleted!` : '')
        )) {
            return;
        }

        deleteSection(section.id);
    }, [section, deleteSection]);

    const reorderTasks = useCallback((itemsInOrder: TreeItem[]) => {    
        itemsInOrder.forEach(updateTaskChildren);
    
        // clearSort();
        updateSection(section.id, { taskIds: itemsInOrder.map(i => i.id) });
    
        async function updateTaskChildren(item: TreeItem) {
            const task = tasksById[item.id];
    
            if (!task) return;
    
            const childrenIds = item.children.map(child => child.id);
    
            if (task.childrenIds.join(',') !== childrenIds.join(',')) {
                await updateTask(task.id, { childrenIds });
            }
    
            item.children.forEach(updateTaskChildren);
        }        
    }, [section.id, updateTask, tasksById, updateSection]);

    const sectionTasks = section.taskIds.map(id => tasksById[id]).filter(Boolean) as Task[];
    
    return (
        <Box
            className={classnames(className, styles.root)}
            variant="outlined"
            shape="rounded-m"
            interactive={false}
        >
            <div className={styles.header}>
                <Editable
                    content={section.name}
                    onBlur={name => updateSection(section.id, { name })}
                />

                <Menu
                    trigger={
                        <Button icon="more_vert" size="s" />
                    }
                    items={[
                        {
                            content: 'Delete',
                            onClick: handleDelete
                        }
                    ]}
                />
            </div>

            <div className={styles.body}>
                <TasksTree
                    tasks={sectionTasks}
                    selectedTask={selectedTask}
                    onSelect={setTask}
                    onToggle={toggleTask}
                    onUpdate={updateTask}
                    onReorder={reorderTasks}
                />
            </div>

            <div className={styles.footer}>
                <TaskInput onSubmit={handleSubmit} />
            </div>
        </Box>
    );
}