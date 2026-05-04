import { createContext, useContext } from 'react';

import type { Tag } from '@olegpolyakov/tasks/core';

export type TagsContextValue = {
    tags: Tag[];
    createTag: (data: Partial<Tag>) => Promise<Tag>;
    updateTag: (id: string, data: Partial<Tag>) => Promise<Tag>;
    deleteTag: (id: string, options?: { deleteTasks?: boolean }) => Promise<void>;
};

const TagsContext = createContext<TagsContextValue>(null! as TagsContextValue);

export function useTagsContext() {
    const context = useContext(TagsContext);
    
    if (!context) {
        throw new Error('useTagsContext must be used within a TagsProvider');
    }
    
    return context;
}

export default TagsContext;