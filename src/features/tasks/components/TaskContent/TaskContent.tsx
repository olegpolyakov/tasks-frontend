import { useState } from 'react';

import { type EditorState, ToolbarEditor } from '@olegpolyakov/editor';
import { Card } from '@olegpolyakov/ui';
import { useDebounce } from '@olegpolyakov/frontend/hooks/fn';

import { noop } from '@/utils';

import { useTaskContext } from '../../hooks';
import { parseContent } from '../../logic/content';

import styles from './TaskContent.module.scss';

export default function TaskContent() {
    const { task, updateTask } = useTaskContext();

    const [initialState] = useState(() => parseContent(task.content));

    const handleUpdate = useDebounce((state: EditorState) => {
        updateTask({ content: JSON.stringify(state) }).catch(noop);
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