import type { ReactNode } from 'react';

import { AuthProvider } from '@olegpolyakov/frontend/features/auth';
import { UploadProvider } from '@olegpolyakov/frontend/features/upload';
import { ApiProvider } from '@olegpolyakov/frontend/services/api';

import { API_URL, AUTH_URL, UPLOAD_URL, WS_URL } from '@/env'; 

import { ProjectsProvider } from './projects';
import { SettingsProvider } from './settings';
import { TagsProvider } from './tags';
import { TasksProvider } from './tasks';

export default function FeaturesProvider({ children }: { children: ReactNode }) {
    return (
        <AuthProvider apiUrl={AUTH_URL}>
            <ApiProvider
                apiUrl={API_URL}
                wsUrl={WS_URL}
            >
                <UploadProvider uploadUrl={UPLOAD_URL}>
                    <SettingsProvider>
                        <TasksProvider>
                            <ProjectsProvider>
                                <TagsProvider>
                                    {children}
                                </TagsProvider>
                            </ProjectsProvider>
                        </TasksProvider>
                    </SettingsProvider>
                </UploadProvider>
            </ApiProvider>
        </AuthProvider>
    );
}