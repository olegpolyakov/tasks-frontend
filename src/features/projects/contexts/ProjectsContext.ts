import { createContext, useContext } from 'react';

import type { Project } from '@olegpolyakov/tasks/core';

export type ProjectsContext = {
    projects: Project[];
    createProject: (data: Partial<Project>) => Promise<void>;
    updateProject: (id: string, data: Partial<Project>) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;

    isCreateProjectDialogOpen: boolean;
    openCreateProjectDialog: () => void;
    closeCreateProjectDialog: () => void;
};

const ProjectsContext = createContext<ProjectsContext>(null! as ProjectsContext);

export function useProjectsContext() {
    const context = useContext(ProjectsContext);
    
    if (!context) {
        throw new Error('useProjectsContext must be used within a ProjectsProvider');
    }
    
    return context;
}

export default ProjectsContext;