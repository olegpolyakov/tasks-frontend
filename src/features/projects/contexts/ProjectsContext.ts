import { createContext } from 'react';

import type { Project } from '@olegpolyakov/tasks-core';

export type ProjectsContextValue = {
    projects: Project[];
    createProject: (data: Partial<Project>) => Promise<void>;
    updateProject: (id: string, data: Partial<Project>) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;

    isCreateProjectDialogOpen: boolean;
    openCreateProjectDialog: () => void;
    closeCreateProjectDialog: () => void;
};

export default createContext<ProjectsContextValue>(null! as ProjectsContextValue);