import { AUTH_URL } from '@/env';
import { AuthProvider } from '@/features/auth';
import { ProjectsProvider } from '@/features/projects';
import { SettingsProvider } from '@/features/settings';
import { TagsProvider } from '@/features/tags';
import { TasksProvider } from '@/features/tasks';

export default function AppDataProvider({ children }: {children: React.ReactNode}) {
    return (
        <AuthProvider apiUrl={AUTH_URL}>
            <SettingsProvider>
                <ProjectsProvider>
                    <TasksProvider>
                        <TagsProvider>
                            {children}
                        </TagsProvider>
                    </TasksProvider>
                </ProjectsProvider>
            </SettingsProvider>
        </AuthProvider>
    );
}