import { createContext } from 'react';

import type { Tag } from '@olegpolyakov/tasks-core';

export type TagsContextValue = {
    tags: Tag[];
    createTag: (data: Partial<Tag>) => Promise<Tag>;
    updateTag: (id: string, data: Partial<Tag>) => Promise<Tag>;
    deleteTag: (id: string, options?: { deleteTasks?: boolean }) => Promise<void>;
};

export default createContext<TagsContextValue>(null! as TagsContextValue);