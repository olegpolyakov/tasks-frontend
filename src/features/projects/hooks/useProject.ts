import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Project, ProjectSection, Task } from '@olegpolyakov/tasks-core';

import * as tasksApi from '@/features/tasks/api';

import * as api from '../api';

export default function useProject(projectId: string) {
    const [project, setProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        api.fetchProject(projectId).then(setProject);
        api.fetchProjectTasks(projectId).then(setTasks);
    }, [projectId]);

    const updateProject = useCallback(async (data: Partial<Project>) => {
        await api.updateProject(projectId, data);
    }, [projectId]);

    const deleteProject = useCallback(async (options: { deleteTasks: boolean }) => {
        await api.deleteProject(projectId, options);
    }, [projectId]);

    const addSection = useCallback(async (data: Partial<ProjectSection>) => {
        await api.addSection(projectId, data).then(section => {
            setProject(project => {
                if (!project) return project;

                return {
                    ...project,
                    sectionIds: [...project.sectionIds, section.id],
                    sections: {
                        ...project.sections,
                        [section.id]: section
                    }
                };
            });
        });
    }, [projectId]);

    const updateSection = useCallback(async (sectionId: string, data: Partial<ProjectSection>) => {
        await api.updateSection(projectId, sectionId, data)
            .then(section => {
                setProject(project => {
                    if (!project) return project;

                    return {
                        ...project,
                        sections: {
                            ...project.sections,
                            [sectionId]: section
                        }
                    };
                });
            });
    }, [projectId]);

    const removeSection = useCallback(async (sectionId: string) => {
        await api.removeSection(projectId, sectionId).then(() => {
            setProject(project => {
                if (!project) return project;

                const { [sectionId]: _, ...sections } = project.sections;

                return {
                    ...project,
                    sectionIds: project.sectionIds.filter(id => id !== sectionId),
                    sections
                };
            });
        });
    }, [projectId]);

    const addTask = useCallback(async (data: Partial<Task>, sectionId?: string) => {
        if (!project) return;

        if (data.projectIds && !data.projectIds.includes(project.id)) {
            data.projectIds.push(project.id);
        } else if (!data.projectIds) {
            data.projectIds = [project.id];
        }
        
        if (sectionId && !(sectionId in project.sections)) {
            throw new Error('Section not found');
        }

        const newTask = await tasksApi.createTask(data);
        
        if (sectionId) {
            const section = project.sections[sectionId];

            if (!section) return;

            await api.updateSection(project.id, sectionId, {
                ...section,
                taskIds: [...section.taskIds, newTask.id]
            });
        }

        setTasks(tasks => [...tasks, newTask]);
    }, [project]);

    const removeTask = useCallback(async (taskId: string, sectionId?: string) => {
        await tasksApi.deleteTask(taskId);

        if (sectionId) {
            const section = project?.sections[sectionId];

            if (!section) return;

            await api.updateSection(project.id, sectionId, {
                taskIds: section.taskIds.filter(id => id !== taskId)
            });
        }

        setTasks(tasks => tasks.filter(task => task.id !== taskId));
    }, [project]);

    const sections = useMemo(() => {
        if (!project) return [];

        return Object.entries(project.sections).map(([id, section]) => ({
            id,
            name: section.name,
            taskIds: section.taskIds
        }));
    }, [project]);

    return {
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
    };
}