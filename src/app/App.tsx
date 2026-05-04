import { BrowserRouter as Router, Navigate,Route, Routes } from 'react-router-dom';

import { Button, Provider as UIProvider, Text } from 'kantanui';
import { Heading } from 'kantanui';

import { Tag, TagCreateAction, TagsNav } from '@/features/tags';
import { Tasks, TasksNav } from '@/features/tasks';

import AppContent from './components/AppContent';
import AppNav from './components/AppNav';
import AppShell from './components/AppShell';
import { DataProvider } from './providers';

import styles from './App.module.scss';

export default function App() {
    return (
        <Router>
            <UIProvider>
                <DataProvider>
                    <AppShell>
                        <div className={styles.root}>
                            <AppNav>
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
                            </AppNav>

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
                        </div>
                    </AppShell>
                </DataProvider>
            </UIProvider>
        </Router>
    );
}