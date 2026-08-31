import { createContext } from 'react';

import type { Tag, TagData } from '@olegpolyakov/tasks-core';

export type TagsContextValue = {
    tags: Tag[];
    createTag: (data: Partial<Tag>) => Promise<TagData>;
    updateTag: (id: string, data: Partial<Tag>) => Promise<TagData>;
    deleteTag: (id: string) => Promise<void>;
};

export default createContext<TagsContextValue>(null! as TagsContextValue);