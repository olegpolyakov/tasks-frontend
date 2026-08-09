import type { ReactNode } from 'react';

import { AUTH_URL } from '@/env';
import { AuthProvider } from '@/features/auth';
import { ProjectsProvider } from '@/features/projects';
import { SettingsProvider } from '@/features/settings';
import { TagsProvider } from '@/features/tags';
import { TasksProvider } from '@/features/tasks';

export default function FeaturesProvider({ children }: { children: ReactNode }) {
    return (
        <AuthProvider apiUrl={AUTH_URL}>
            <SettingsProvider>
                <TasksProvider>
                    <ProjectsProvider>
                        <TagsProvider>
                            {children}
                        </TagsProvider>
                    </ProjectsProvider>
                </TasksProvider>
            </SettingsProvider>
        </AuthProvider>
    );
}