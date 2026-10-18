import { Navigate, Route, Routes } from 'react-router-dom';

import { Button, Heading, Scrollable, Text } from '@olegpolyakov/ui';
import { AppContent, AppDrawer, AppShell } from '@olegpolyakov/frontend/app';
import { createStore, StoreContext } from '@olegpolyakov/frontend/store';

import { FeaturesProvider } from '@/features';
import { initProjectsState, Project, ProjectCreateAction, ProjectsNav } from '@/features/projects';
import { initSettingsState } from '@/features/settings';
import { initTagsState, Tag, TagCreateAction, TagsNav } from '@/features/tags';
import { initTasksState, Tasks, TasksNav } from '@/features/tasks';
import { useTranslation } from '@/i18n';

import styles from './App.module.scss';

const store = createStore();

initProjectsState(store);
initSettingsState(store);
initTagsState(store);
initTasksState(store);

export default function App() {
    const { t } = useTranslation();

    return (
        <StoreContext value={store}>
            <AppShell name={t('tasks')}>
                <FeaturesProvider>
                    <AppDrawer scrollable={false}>
                        <Scrollable
                            className={styles.sidebar}
                            fade
                        >
                            <Heading
                                className={styles.heading}
                                content={t('tasks')}
                                end={
                                    <Button
                                        icon="settings"
                                        title={t('settings')}
                                    />
                                }
                            />
    
                            <TasksNav />

                            <Text
                                content={t('projects')}
                                end={
                                    <ProjectCreateAction
                                        icon="add"
                                        size="xs"
                                    />
                                }
                                color="secondary"
                                size="xs"
                                decorative
                            />
                            <ProjectsNav />

                            <Text
                                content={t('tags')}
                                end={
                                    <TagCreateAction
                                        icon="add"
                                        size="xs"
                                    />
                                }
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
                                element={
                                    <Navigate
                                        to="/today"
                                        replace
                                    />
                                }
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