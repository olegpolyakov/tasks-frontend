import { type ReactNode, useCallback, useMemo, useState } from 'react';

import type { Project } from '@olegpolyakov/tasks-core';
import { Dialog } from '@olegpolyakov/ui';

import { ProjectForm } from '../components';
import { ProjectsContext } from '../contexts';
import { useProjects } from '../hooks';

export default function ProjectsProvider({ children }: {children: ReactNode}) {
    const {
        projects,
        createProject,
        updateProject,
        deleteProject
    } = useProjects();

    const [isCreateProjectDialogOpen, setCreateProjectDialogOpen] = useState(false);

    const handleSubmit = useCallback(async (data: Partial<Project>) => {
        await createProject(data);
        setCreateProjectDialogOpen(false);
    }, [createProject]);

    const value = useMemo(() => ({
        projects,
        createProject,
        updateProject,
        deleteProject,

        isCreateProjectDialogOpen,
        openCreateProjectDialog: () => setCreateProjectDialogOpen(true),
        closeCreateProjectDialog: () => setCreateProjectDialogOpen(false)
    }), [
        projects,
        createProject,
        updateProject,
        deleteProject,
        isCreateProjectDialogOpen
    ]);

    return (
        <ProjectsContext.Provider value={value}>
            {children}

            <Dialog
                title="New Project"
                open={isCreateProjectDialogOpen}
                onClose={() => setCreateProjectDialogOpen(false)}
            >
                <ProjectForm onSubmit={handleSubmit} />
            </Dialog>
        </ProjectsContext.Provider>
    );
}