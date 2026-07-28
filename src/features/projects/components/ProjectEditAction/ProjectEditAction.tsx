import { Button } from '@olegpolyakov/ui';

import { useProjectContext } from '../../hooks';

export default function ProjectEditAction() {
    const { openProjectDialog } = useProjectContext();

    return (
        <Button
            content="Edit project"
            onClick={openProjectDialog}
        />
    );
}