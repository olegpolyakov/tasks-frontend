import { Navigate, Route, Routes } from 'react-router-dom';

import { Button, Heading, Text } from 'kantanui';

import { AppContent, AppDrawer, AppShell } from '@olegpolyakov/frontend/app';

import { Tag, TagCreateAction, TagsNav } from '@/features/tags';
import { Tasks, TasksNav } from '@/features/tasks';

import AppDataProvider from './AppDataProvider';

import styles from './App.module.scss';

export default function App() {
    return (
        <AppDataProvider>
            <AppShell name="Tasks">
                <AppDrawer>
                    <div className={styles.sidebar}>
                        <Heading
                            content="Tasks"
                            end={
                                <Button
                                    icon="settings"
                                    title="Settings"
                                />
                            }
                        />
    
                        <TasksNav />

                        <Text
                            content="Tags"
                            end={<TagCreateAction icon="add" size="xs" />}
                            color="secondary"
                            size="xs"
                            decorative
                        />
                        <TagsNav />
                    </div>
                </AppDrawer>

                <AppContent>
                    <Routes>
                        <Route
                            index
                            element={<Navigate to="/today" replace />}
                        />

                        <Route
                            path="/:filter"
                            element={<Tasks />}
                        />

                        <Route
                            path="/tags/:tagId"
                            element={<Tag />}
                        />
                    </Routes>
                </AppContent>
            </AppShell>
        </AppDataProvider>
    );
}