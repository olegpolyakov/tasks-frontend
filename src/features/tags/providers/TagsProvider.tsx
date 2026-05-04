import { type ReactNode, useMemo } from 'react';

import { TagsContext, TagsContextValue } from '../contexts';
import { useTags } from '../hooks';

export default function TagsProvider({
    children
}: {
    children: ReactNode | ((value: TagsContextValue) => ReactNode)
}) {
    const {
        tags,
        createTag,
        updateTag,
        deleteTag
    } = useTags();

    const value = useMemo(() => ({
        tags,
        createTag,
        updateTag,
        deleteTag
    }), [
        tags,
        createTag,
        updateTag,
        deleteTag
    ]);

    return (
        <TagsContext.Provider value={value}>
            {typeof children === 'function'
                ? children(value)
                : children
            }
        </TagsContext.Provider>
    );
}