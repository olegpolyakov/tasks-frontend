import { createContext, useContext } from 'react';

import type { Tag } from '@olegpolyakov/tasks/core';

export type TagContextValue = {
    tag: Tag;
    setTag: (tag: Tag) => void;
    updateTag: (data: Partial<Tag>) => Promise<void>;
    deleteTag: () => Promise<void>;
};

const TagContext = createContext<TagContextValue>(null! as TagContextValue);

export function useTagContext() {
    const context = useContext(TagContext);
    
    if (!context) {
        throw new Error('useTagContext must be used within a TagProvider');
    }
    
    return context;
}

export default TagContext;