import type { EditorState } from '@olegpolyakov/editor';

export function parseContent(content?: string | null): EditorState | undefined {
    if (!content) return undefined;

    try {
        const state = JSON.parse(content);

        return state && typeof state === 'object'
            ? state as EditorState
            : undefined;
    } catch {
        return undefined;
    }
}
