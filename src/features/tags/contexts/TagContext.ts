import { createContext } from 'react';

import type { Tag } from '@olegpolyakov/tasks-core';

export type TagContextValue = {
    tag: Tag;
    setTag: (tag: Tag) => void;
    updateTag: (data: Partial<Tag>) => Promise<void>;
    deleteTag: () => Promise<void>;
};

export default createContext<TagContextValue>(null! as TagContextValue);