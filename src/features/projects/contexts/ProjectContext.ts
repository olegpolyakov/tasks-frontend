import { createContext, useContext } from 'react';

import type { Project, ProjectSection, Task } from '@olegpolyakov/tasks/core';

export type ProjectContext = {
    project: Project;
    sections: ProjectSection[];
    tasks: Task[];

    updateProject: (data: Partial<Project>) => Promise<void>;
    deleteProject: (options: { deleteTasks: boolean }) => Promise<void>;

    addSection: (data: Partial<ProjectSection>) => Promise<void>;
    updateSection: (sectionId: string, data: Partial<ProjectSection>) => Promise<void>;
    removeSection: (sectionId: string) => Promise<void>;

    addTask: (data: Partial<Task>, sectionId?: string) => Promise<void>;
    removeTask: (taskId: string, sectionId?: string) => Promise<void>;

    isProjectDialogOpen: boolean;
    openProjectDialog: () => void;
    closeProjectDialog: () => void;
};

const ProjectContext = createContext<ProjectContext>(null! as ProjectContext);

export function useProjectContext() {
    const context = useContext(ProjectContext);
    
    if (!context) {
        throw new Error('useProjectContext must be used within a ProjectProvider');
    }
    
    return context;
}

export default ProjectContext;