import { describe, expect, test } from 'vitest';

import { parseContent } from '@/features/tasks/logic/content';

describe('parseContent', () => {
    test('parses valid editor state', () => {
        expect(parseContent('{"root":{"children":[]}}')).toEqual({ root: { children: [] } });
    });

    test('returns undefined for empty content', () => {
        expect(parseContent('')).toBeUndefined();
        expect(parseContent(undefined)).toBeUndefined();
        expect(parseContent(null)).toBeUndefined();
    });

    test('returns undefined for malformed JSON', () => {
        expect(parseContent('{"root":')).toBeUndefined();
        expect(parseContent('plain text')).toBeUndefined();
    });

    test('returns undefined for non-object JSON', () => {
        expect(parseContent('123')).toBeUndefined();
        expect(parseContent('"text"')).toBeUndefined();
        expect(parseContent('null')).toBeUndefined();
    });
});
