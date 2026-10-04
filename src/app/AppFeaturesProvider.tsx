import type { ReactNode } from 'react';

import { AuthProvider } from '@olegpolyakov/frontend/features/auth';
import { ApiProvider } from '@olegpolyakov/frontend/services/api';

import { API_URL, AUTH_URL, WS_URL } from '@/env'; 
import { ProjectsProvider } from '@/features/projects';
import { SettingsProvider } from '@/features/settings';
import { TagsProvider } from '@/features/tags';
import { TasksProvider } from '@/features/tasks';

export default function AppFeaturesProvider({ children }: { children: ReactNode }) {
    return (
        <AuthProvider apiUrl={AUTH_URL}>
            <ApiProvider apiUrl={API_URL} wsUrl={WS_URL}>
                <SettingsProvider>
                    <TasksProvider>
                        <ProjectsProvider>
                            <TagsProvider>
                                {children}
                            </TagsProvider>
                        </ProjectsProvider>
                    </TasksProvider>
                </SettingsProvider>
            </ApiProvider>
        </AuthProvider>
    );
}