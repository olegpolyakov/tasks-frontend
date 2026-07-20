import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Project } from '@olegpolyakov/tasks-core';
import { Dialog } from '@olegpolyakov/ui';

import { ProjectForm } from '../components';
import { ProjectContext } from '../contexts';
import { useProject } from '../hooks';

export default function ProjectProvider({
    children
}: {
    children: ReactNode
}) {
    const { projectId = '' } = useParams<{ projectId: string }>();
    
    const {
        project,
        sections,
        tasks,

        updateProject,
        deleteProject,

        addSection,
        updateSection,
        removeSection,

        addTask,
        removeTask
    } = useProject(projectId);

    const [isProjectDialogOpen, setProjectDialogOpen] = useState(false);

    const handleSubmit = useCallback(async (data: Partial<Project>) => {
        await updateProject(data);
        setProjectDialogOpen(false);
    }, [updateProject]);

    const value = useMemo(() => ({
        project: project!,
        sections,
        tasks,

        updateProject,
        deleteProject,

        addSection,
        updateSection,
        removeSection,

        addTask,
        removeTask,

        isProjectDialogOpen,
        openProjectDialog: () => setProjectDialogOpen(true),
        closeProjectDialog: () => setProjectDialogOpen(false)
    }), [
        project,
        sections,
        tasks,
        updateProject,
        deleteProject,
        addSection,
        updateSection,
        removeSection,
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