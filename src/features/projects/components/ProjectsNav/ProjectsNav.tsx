import { NavLink } from 'react-router-dom';

import { Item, List } from '@olegpolyakov/ui';
import EntityIcon from '@olegpolyakov/frontend/components/EntityIcon';

import { useProjectsContext } from '../../contexts';

export default function ProjectsNav() {
    const { projects } = useProjectsContext();

    return (
        <div>
            <List gap="s">
                {projects.map(project => (
                    <NavLink key={project.id} to={`/projects/${project.id}`}>
                        {({ isActive }) => (
                            <Item
                                key={project.id}
                                start={
                                    <EntityIcon icon={project.icon || 'folder'} />
                                }
                                content={project.name}
                                variant="plain"
                                shape="rounded-s"
                                active={isActive}
                                interactive
                            />
                        )}
                    </NavLink>
                ))}
            </List>
        </div>
    );
}