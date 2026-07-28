import { useState } from 'react';

import { type EditorState, ToolbarEditor } from '@olegpolyakov/editor';
import { Card } from '@olegpolyakov/ui';
import { useDebounce } from '@olegpolyakov/frontend/hooks/fn';

import { useTaskContext } from '../../hooks';

import styles from './TaskContent.module.scss';

export default function TaskContent() {
    const { task, updateTask } = useTaskContext();

    const [initialState] = useState(
        task.content
            ? JSON.parse(task.content) as EditorState
            : undefined
    );

    const handleUpdate = useDebounce((state: EditorState) => {
        updateTask({ content: JSON.stringify(state) });
    }, 1000, []);

    return (
        <div className={styles.root}>
            <Card size="xs">
                <ToolbarEditor
                    initialState={initialState}
                    compact
                    toolbar={{
                        hideHistory: true,
                        hideTextAlignment: true
                    }}
                    onChange={handleUpdate}
                />
            </Card>
        </div>
    );
}