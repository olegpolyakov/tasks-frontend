import { Navigate, Route, Routes } from 'react-router-dom';

import { Button, Heading, Text } from '@olegpolyakov/ui';
import { AppContent, AppDrawer, AppShell } from '@olegpolyakov/frontend/app';

import { initState as initProjectsState, Project, ProjectCreateAction, ProjectsNav } from '@/features/projects';
import { initState as initTagsState, Tag, TagCreateAction, TagsNav } from '@/features/tags';
import { initState as initTasksState, Tasks, TasksNav } from '@/features/tasks';
import { createStore, StoreContext } from '@/store';

import FeaturesProvider from './FeaturesProvider';

import styles from './App.module.scss';

const store = createStore();

initProjectsState(store);
initTasksState(store);
initTagsState(store);

export default function App() {
    return (
        <StoreContext value={store}>
            <AppShell name="Tasks">
                <FeaturesProvider>
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
                                path="/projects/:projectId"
                                element={<Project />}
                            />

                            <Route
                                path="/tags/:tagId"
                                element={<Tag />}
                            />
                        </Routes>
                    </AppContent>
                </FeaturesProvider>
            </AppShell>
        </StoreContext>
    );
}