import { NavLink } from 'react-router-dom';

import { Item, List } from '@olegpolyakov/ui';
import { useAppContext } from '@olegpolyakov/frontend/app';
import EntityIcon from '@olegpolyakov/frontend/components/EntityIcon';

import { useProjectsContext } from '../../hooks';

export default function ProjectsNav() {
    const { projects } = useProjectsContext();
    const { closeDrawer } = useAppContext();

    return (
        <div>
            <List gap="s">
                {projects.map(project => (
                    <NavLink key={project.id} to={`/projects/${project.id}`}>
                        {({ isActive }) => (
                            <Item
                                key={project.id}
                                start={
                                    <EntityIcon
                                        icon={project.icon || 'folder'}
                                        size="m"
                                    />
                                }
                                content={project.name}
                                variant="plain"
                                shape="rounded-s"
                                active={isActive}
                                interactive
                                onClick={closeDrawer}
                            />
                        )}
                    </NavLink>
                ))}
            </List>
        </div>
    );
}