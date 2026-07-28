import { useState } from 'react';

import { type EditorState, ToolbarEditor } from '@olegpolyakov/editor';
import { Card } from '@olegpolyakov/ui';
import { useDebounce } from '@olegpolyakov/frontend/hooks/fn';

import { useProjectContext } from '../../hooks';

import styles from './ProjectContent.module.scss';

export default function ProjectContent() {
    const { project, updateProject } = useProjectContext();

    const [initialState] = useState(
        project.content
            ? JSON.parse(project.content) as EditorState
            : undefined
    );

    const handleUpdate = useDebounce((state: EditorState) => {
        updateProject({ content: JSON.stringify(state) });
    }, 1000, []);

    return (
        <div className={styles.root}>
            <Card size="s">
                <ToolbarEditor
                    initialState={initialState}
                    onChange={handleUpdate}
                />
            </Card>
        </div>
    );
}