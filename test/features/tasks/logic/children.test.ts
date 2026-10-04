import { describe, expect, test } from 'vitest';

import type { Task } from '@olegpolyakov/tasks-core';

import { buildTree, getAllChildren } from '@/features/tasks/logic/children';

describe.todo('buildTree', () => {});

describe('getAllChildren', () => {
    describe('given a task without children', () => {
        test('returns an empty array', () => {
            const id = '1';
            const record: Record<string, Task> = {
                [id]: { id: '1', childrenIds: [] as string[] } as Task
            };

            expect(getAllChildren(id, record)).toHaveLength(0);
        });
    });
    
    describe('given a task with 1 child', () => {
        test('returns an array with 1 item', () => {
            const id = '1';
            const record: Record<string, Task> = {
                1: { id: '1', childrenIds: ['2'] as string[] } as Task,
                2: { id: '2', childrenIds: [] as string[] } as Task
            };

            expect(getAllChildren(id, record)).toHaveLength(1);
        });
    });

    describe('given a task with 2 children', () => {
        test('returns an array with 2 items', () => {
            const id = '1';
            const record: Record<string, Task> = {
                1: { id: '1', childrenIds: ['2', '3'] as string[] } as Task,
                2: { id: '2', childrenIds: [] as string[] } as Task,
                3: { id: '3', childrenIds: [] as string[] } as Task
            };

            expect(getAllChildren(id, record)).toHaveLength(2);
        });
    });

    describe('given a task with 1 child with 1 child', () => {
        test('returns an array with 2 items', () => {
            const id = '1';
            const record: Record<string, Task> = {
                1: { id: '1', childrenIds: ['2'] as string[] } as Task,
                2: { id: '2', childrenIds: ['3'] as string[] } as Task,
                3: { id: '3', childrenIds: [] as string[] } as Task
            };

            expect(getAllChildren(id, record)).toHaveLength(2);
        });
    });

    describe('given a task 2 children each containing 2 children', () => {
        test('returns an array with 2 items', () => {
            const id = '1';
            const record: Record<string, Task> = {
                1: { id: '1', childrenIds: ['2', '3'] as string[] } as Task,
                2: { id: '2', childrenIds: ['4', '5'] as string[] } as Task,
                3: { id: '3', childrenIds: ['6', '7'] as string[] } as Task,
                4: { id: '4', childrenIds: [] as string[] } as Task,
                5: { id: '5', childrenIds: [] as string[] } as Task,
                6: { id: '6', childrenIds: [] as string[] } as Task,
                7: { id: '7', childrenIds: [] as string[] } as Task
            };

            expect(getAllChildren(id, record)).toHaveLength(6);
        });
    });
});

const task = (id: string, childrenIds: string[] = [], completed = false) =>
    ({ id, childrenIds, completed }) as Task;

const toRecord = (...tasks: Task[]) =>
    Object.fromEntries(tasks.map(t => [t.id, t])) as Record<string, Task>;

const ids = (tasks: Task[]) => tasks.map(t => t.id);

describe('getAllChildren with a filter', () => {
    const incomplete = (t: Task) => !t.completed;

    test('applies the filter at every depth', () => {
        const record = toRecord(
            task('1', ['2']),
            task('2', ['3']),
            task('3', [], true)
        );

        expect(ids(getAllChildren('1', record, incomplete))).toEqual(['2']);
    });

    test('includes matching descendants of a child that does not match', () => {
        const record = toRecord(
            task('1', ['2']),
            task('2', ['3'], true),
            task('3')
        );

        expect(ids(getAllChildren('1', record, incomplete))).toEqual(['3']);
    });

    test('ignores child ids that do not exist', () => {
        const record = toRecord(task('1', ['2', 'missing']), task('2'));

        expect(ids(getAllChildren('1', record))).toEqual(['2']);
    });

    test('throws when the task does not exist', () => {
        expect(() => getAllChildren('x', {})).toThrow();
    });
});
