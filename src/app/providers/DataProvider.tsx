import { SettingsProvider } from '@/features/settings';
import { TagsProvider } from '@/features/tags';
import { TasksProvider } from '@/features/tasks';
import { UserProvider } from '@/features/user';

export default function DataProvider({ children }: {children: React.ReactNode}) {
    return (
        <UserProvider>
            <SettingsProvider>
                <TasksProvider>
                    <TagsProvider>
                        {children}
                    </TagsProvider>
                </TasksProvider>
            </SettingsProvider>
        </UserProvider>
    );
}