import { type ReactNode, useEffect, useState } from 'react';

import { Button, ButtonGroup, Heading, Icon } from '@olegpolyakov/ui';
import { containsEmoji } from '@olegpolyakov/frontend/helpers/emoji';

import { useProjectContext } from '../../contexts';
import ProjectDeleteAction from '../ProjectDeleteAction';
import ProjectSection from '../ProjectSection';

import styles from './ProjectView.module.scss';

export default function ProjectView({ children }: {children?: ReactNode}) {
    const {
        project,
        sections,
        tasks,
        addSection,
        updateSection,
        removeSection,
        openProjectDialog
    } = useProjectContext();

    const [view, setView] = useState<'board' | 'list'>(() => {
        const savedView = localStorage.getItem(`tasks.projects.${project.id}.view`);
        return savedView === 'list' ? 'list' : 'board';
    });

    useEffect(() => {
        localStorage.setItem(`tasks.projects.${project.id}.view`, view);
    }, [view, project.id]);

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <div className={styles.header}>
                    <Heading
                        start={project.icon && (containsEmoji(project.icon) ? project.icon : <Icon name={project.icon || 'folder'} />)}
                        content={project.name}
                    />

                    <ButtonGroup joined>
                        <Button
                            icon="view_kanban"
                            content="Board"
                            active={view === 'board'}
                            onClick={() => setView('board')}
                        />

                        <Button
                            icon="view_list"
                            content="List"
                            active={view === 'list'}
                            onClick={() => setView('list')}
                        />
                    </ButtonGroup>

                    <ButtonGroup>
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

                <div className={styles[view]}>
                    <div className={styles.content}>
                        {sections.map(section => (
                            <ProjectSection
                                className={styles.section}
                                key={section.id}
                                section={section}
                                tasks={tasks.filter(task => section.taskIds.includes(task.id))}
                                onUpdate={updateSection}
                                onDelete={removeSection}
                            />
                        ))}

                        <Button
                            icon="add"
                            content="Add Section"
                            onClick={() => addSection({ name: 'New Section' })}
                        />
                    </div>
                </div>
            </div>

            {children}
        </div>
    );
}