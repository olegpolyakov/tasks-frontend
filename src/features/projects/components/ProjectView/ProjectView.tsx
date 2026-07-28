import type { ReactNode } from 'react';

import { Button, ButtonGroup, Heading, Icon, Tab, TabGroup, TabPanel, Tabs } from '@olegpolyakov/ui';
import { containsEmoji } from '@olegpolyakov/frontend/helpers/emoji';

import { useProjectContext } from '../../hooks';
import ProjectContent from '../ProjectContent';
import ProjectDeleteAction from '../ProjectDeleteAction';
import ProjectTasks from '../ProjectTasks/ProjectTasks';

import styles from './ProjectView.module.scss';

export default function ProjectView({ children }: {children?: ReactNode}) {
    const { project, createSection, openProjectDialog } = useProjectContext();

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <Tabs defaultValue="tasks">
                    <div className={styles.header}>
                        <Heading
                            start={project.icon && (containsEmoji(project.icon) ? project.icon : <Icon name={project.icon || 'folder'} />)}
                            content={project.name}
                        />

                        <TabGroup>
                            <Tab
                                value="tasks"
                                content="Tasks"
                            />

                            <Tab
                                value="content"
                                content="Content"
                            />
                        </TabGroup>

                        <ButtonGroup>
                            <Button
                                className={styles.addSectionButton}
                                icon="add"
                                content="Add Section"
                                variant="tinted"
                                onClick={() => createSection({ name: 'New Section' })}
                            />
                
                            <Button
                                title="Edit Project"
                                icon="edit"
                                onClick={openProjectDialog}
                            />

                            <ProjectDeleteAction
                                icon="delete"
                                color="danger"
                            />
                        </ButtonGroup>
                    </div>

                    <TabPanel className={styles.body} value="tasks">
                        <ProjectTasks />
                    </TabPanel>

                    <TabPanel className={styles.body} value="content">
                        <ProjectContent />
                    </TabPanel>
                </Tabs>
            </div>

            {children}
        </div>
    );
}