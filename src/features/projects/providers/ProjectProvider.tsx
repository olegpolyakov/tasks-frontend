import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Project } from '@olegpolyakov/tasks-core';
import { Dialog } from '@olegpolyakov/ui';

import { ProjectForm } from '../components';
import { ProjectContext } from '../contexts';
import { useProject, useProjectTasks } from '../hooks';

export default function ProjectProvider({
    children
}: {
    children: ReactNode
}) {
    const { projectId = '' } = useParams<{ projectId: string }>();
    
    const {
        project,
        updateProject,
        deleteProject,
        
        sections,
        createSection,
        updateSection,
        deleteSection
    } = useProject(projectId);
    const { tasks, addTask, removeTask } = useProjectTasks(project);

    const [isProjectDialogOpen, setProjectDialogOpen] = useState(false);

    const handleSubmit = useCallback(async (data: Partial<Project>) => {
        await updateProject(data);
        setProjectDialogOpen(false);
    }, [updateProject]);

    const value = useMemo(() => ({
        project: project!,
        updateProject,
        deleteProject,

        sections,
        createSection,
        updateSection,
        deleteSection,
        
        tasks,
        addTask,
        removeTask,

        isProjectDialogOpen,
        openProjectDialog: () => setProjectDialogOpen(true),
        closeProjectDialog: () => setProjectDialogOpen(false)
    }), [
        project,
        updateProject,
        deleteProject,

        sections,
        createSection,
        updateSection,
        deleteSection,
        
        tasks,
        addTask,
        removeTask,
        
        isProjectDialogOpen
    ]);

    if (!project) return null;

    return (
        <ProjectContext.Provider value={value}>
            {children}

            <Dialog
                title="Edit Project"
                open={isProjectDialogOpen}
                onClose={() => setProjectDialogOpen(false)}
            >
                <ProjectForm
                    data={project}
                    onSubmit={handleSubmit}
                />
            </Dialog>
        </ProjectContext.Provider>
    );
}