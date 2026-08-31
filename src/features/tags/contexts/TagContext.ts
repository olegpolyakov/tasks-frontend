import { createContext } from 'react';

import type { Tag, TagData } from '@olegpolyakov/tasks-core';

export type TagContextValue = {
    tag: Tag;
    setTag: (tag: TagData) => void;
    updateTag: (data: Partial<TagData>) => Promise<void>;
    deleteTag: () => Promise<void>;
};

export default createContext<TagContextValue>(null! as TagContextValue);