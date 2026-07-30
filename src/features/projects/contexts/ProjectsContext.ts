import { createContext } from 'react';

import type { Project, ProjectData } from '@olegpolyakov/tasks-core';

export type ProjectsContextValue = {
    projects: Project[];
    createProject: (data: Partial<ProjectData>) => Promise<ProjectData>;
    updateProject: (id: string, data: Partial<ProjectData>) => Promise<ProjectData>;
    deleteProject: (id: string) => Promise<void>;

    isCreateProjectDialogOpen: boolean;
    openCreateProjectDialog: () => void;
    closeCreateProjectDialog: () => void;
};

export default createContext<ProjectsContextValue>(null! as ProjectsContextValue);