import { Navigate, Route, Routes } from 'react-router-dom';

import { Button, Heading, Text } from 'kantanui';

import AppShell from '@olegpolyakov/frontend/components/AppShell';

import { Tag, TagCreateAction, TagsNav } from '@/features/tags';
import { Tasks, TasksNav } from '@/features/tasks';

import AppDataProvider from './AppDataProvider';

import styles from './App.module.scss';

export default function App() {
    return (
        <AppDataProvider>
            <AppShell>
                <div className={styles.root}>
                    <div className={styles.sidebar}>
                        <Heading
                            className={styles.heading}
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

                    <div className={styles.content}>
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
                    </div>
                </div>
            </AppShell>
        </AppDataProvider>
    );
}