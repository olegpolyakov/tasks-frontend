import { useCallback } from 'react';

import type { ProjectSection, Task } from '@olegpolyakov/tasks-core';
import { Box, Button, Flex, Menu } from '@olegpolyakov/ui';

import { TaskInput, TasksList, useTaskContext } from '@/features/tasks';

import { useProjectContext } from '../../contexts';

export default function ProjectSection({
    section,
    className
}: {
    section: ProjectSection,
    tasks: Task[],
    onUpdate: (id: string, data: Partial<ProjectSection>) => void,
    onDelete: (id: string) => void
    className?: string,
}) {
    const {
        tasks,
        addTask,
        removeTask,
        removeSection
    } = useProjectContext();

    const { setTask, toggleTask } = useTaskContext();

    const handleSubmit = useCallback((data: Partial<Task>) => {
        addTask(data, section.id);
    }, [addTask, section.id]);

    const sectionTasks = tasks.filter(task => section.taskIds.includes(task.id));
        
    return (
        <Box className={className} variant="tinted" padding="s" shape="rounded-m" interactive={false}>
            <Flex column gap="s">
                <Flex align="center" justify="between">
                    {section.name}

                    <Menu
                        trigger={<Button icon="more_vert" size="s" />}
                        items={[
                            { content: 'Edit', onClick: () => {} },
                            { content: 'Delete', onClick: () => removeSection(section.id) }
                        ]}
                    />
                </Flex>

                <div>
                    <TasksList
                        tasks={sectionTasks}
                        onSelect={setTask}
                        onToggle={toggleTask}
                        onDelete={removeTask}
                    />

                    <TaskInput onSubmit={handleSubmit} />
                </div>
            </Flex>
        </Box>
    );
}