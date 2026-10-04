import { Navigate, Route, Routes } from 'react-router-dom';

import { Button, Heading, Scrollable, Text } from '@olegpolyakov/ui';
import { AppContent, AppDrawer, AppShell } from '@olegpolyakov/frontend/app';
import { createStore, StoreContext } from '@olegpolyakov/frontend/store';

import { initProjectsState, Project, ProjectCreateAction, ProjectsNav } from '@/features/projects';
import { initSettingsState } from '@/features/settings';
import { initTagsState, Tag, TagCreateAction, TagsNav } from '@/features/tags';
import { initTasksState, Tasks, TasksNav } from '@/features/tasks';

import AppFeaturesProvider from './AppFeaturesProvider';

import styles from './App.module.scss';

const store = createStore();

initSettingsState(store);
initTasksState(store);
initProjectsState(store);
initTagsState(store);

export default function App() {
    return (
        <StoreContext value={store}>
            <AppShell name="Tasks">
                <AppFeaturesProvider>
                    <AppDrawer scrollable={false}>
                        <Scrollable className={styles.sidebar} fade>
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
                                content="Projects"
                                end={<ProjectCreateAction icon="add" size="xs" />}
                                color="secondary"
                                size="xs"
                                decorative
                            />
                            <ProjectsNav />

                            <Text
                                content="Tags"
                                end={<TagCreateAction icon="add" size="xs" />}
                                color="secondary"
                                size="xs"
                                decorative
                            />
                            <TagsNav />
                        </Scrollable>
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
                                path="/projects/:projectId"
                                element={<Project />}
                            />

                            <Route
                                path="/tags/:tagId"
                                element={<Tag />}
                            />
                        </Routes>
                    </AppContent>
                </AppFeaturesProvider>
            </AppShell>
        </StoreContext>
    );
}