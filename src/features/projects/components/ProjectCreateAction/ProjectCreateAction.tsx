import { Button, type ButtonProps } from '@olegpolyakov/ui';

import { useProjectsContext } from '../../contexts/ProjectsContext';

export default function ProjectCreateAction(props: ButtonProps) {
    const { openCreateProjectDialog } = useProjectsContext();

    return (
        <Button
            title="Create project"
            onClick={openCreateProjectDialog}
            {...props}
        />
    );
}