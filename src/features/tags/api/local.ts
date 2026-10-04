import { v4 as uuid } from 'uuid';

import type { TagData } from '@olegpolyakov/tasks-core';

import type { TagsApi } from './interface';

const tags = new Map<string, TagData>();
const events = new EventTarget();

export default (): TagsApi => ({
    events,
    
    async fetchTags() {
        return Array.from(tags.values());
    },

    async fetchTag(id: string): Promise<TagData> {
        const tag = tags.get(id);

        if (!tag) throw new Error('Tag not found');
        
        return tag;
    },

    async createTag(data: Partial<TagData>) {
        const id = uuid();

        const tag = { id, ...data } as TagData;
        tags.set(id, tag);

        this.events.dispatchEvent(new MessageEvent('message', {
            data: JSON.stringify({
                model: 'Tag',
                action: 'insert',
                documentId: id,
                data: tag
            })
        }));
        return tag;
    },

    async updateTag(id: string, data: Partial<TagData>) {
        const tag = tags.get(id);

        if (!tag) throw new Error('Tag not found');

        const updatedTag = { ...tag, ...data } as TagData;
        tags.set(id, updatedTag);

        this.events.dispatchEvent(new MessageEvent('message', {
            data: JSON.stringify({
                model: 'Tag',
                action: 'update',
                documentId: id,
                data: updatedTag
            })
        }));

        return updatedTag;
    },

    async deleteTag(id: string): Promise<void> {
        tags.delete(id);

        this.events.dispatchEvent(new MessageEvent('message', {
            data: JSON.stringify({
                model: 'Tag',
                action: 'delete',
                documentId: id,
                data: null
            })
        }));

        return;
    }
});