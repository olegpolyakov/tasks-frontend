import type { TagData } from '@olegpolyakov/tasks-core';

export interface TagsApi {
    events: EventTarget;

    fetchTags(): Promise<TagData[]>;
    fetchTag(id: string): Promise<TagData>;
    createTag(data: Partial<TagData>): Promise<TagData>;
    updateTag(id: string, data: Partial<TagData>): Promise<TagData>;
    deleteTag(id: string, options?: { deleteTasks: boolean }): Promise<void>;
}