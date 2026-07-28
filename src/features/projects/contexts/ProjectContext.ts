import { createContext } from 'react';

import type { ProjectData, ProjectSectionData, Task, TaskData } from '@olegpolyakov/tasks-core';

export type ProjectContextValue = {
    project: ProjectData;
    updateProject: (data: Partial<ProjectData>) => Promise<void>;
    deleteProject: (options: { deleteTasks: boolean }) => Promise<void>;
    
    sections: ProjectSectionData[];
    createSection: (data: Partial<ProjectSectionData>) => Promise<void>;
    updateSection: (sectionId: string, data: Partial<ProjectSectionData>) => Promise<void>;
    deleteSection: (sectionId: string) => Promise<void>;
    
    tasks: Task[];
    addTask: (data: Partial<TaskData>, sectionId?: string) => Promise<TaskData>;
    removeTask: (taskId: string, sectionId?: string) => Promise<void>;

    isProjectDialogOpen: boolean;
    openProjectDialog: () => void;
    closeProjectDialog: () => void;
};

export default createContext<ProjectContextValue>(null! as ProjectContextValue);