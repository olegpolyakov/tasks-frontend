import { AuthProvider } from '@/features/auth';
import { SettingsProvider } from '@/features/settings';
import { TagsProvider } from '@/features/tags';
import { TasksProvider } from '@/features/tasks';

export default function AppDataProvider({ children }: {children: React.ReactNode}) {
    return (
        <SettingsProvider>
            <TasksProvider>
                <TagsProvider>
                    {children}
                </TagsProvider>
            </TasksProvider>
        </SettingsProvider>
    );
}