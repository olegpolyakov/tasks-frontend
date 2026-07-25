import { createContext, useContext } from 'react';

import type { ProjectData, ProjectSectionData, Task, TaskData } from '@olegpolyakov/tasks-core';

export type ProjectContext = {
    project: ProjectData;
    sections: ProjectSectionData[];
    tasks: Task[];

    updateProject: (data: Partial<ProjectData>) => Promise<void>;
    deleteProject: (options: { deleteTasks: boolean }) => Promise<void>;

    createSection: (data: Partial<ProjectSectionData>) => Promise<void>;
    updateSection: (sectionId: string, data: Partial<ProjectSectionData>) => Promise<void>;
    deleteSection: (sectionId: string) => Promise<void>;

    addTask: (data: Partial<TaskData>, sectionId?: string) => Promise<void>;
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