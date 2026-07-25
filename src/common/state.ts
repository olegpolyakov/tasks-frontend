import { useEffect, useRef } from 'react';

import { PrimitiveAtom, useAtom } from 'jotai';

export type StateEvent<T> = {
    model: string;
    action: 'insert' | 'update' | 'delete';
    documentId: string;
    data: T;
};

export type StateAction<T> = {
    type: string;
    data: T;
};

export function useListState<T extends { id: string }>(
    atom: PrimitiveAtom<T[]>,
    events: EventTarget,
    filter: (event: StateEvent<T>) => boolean
) {
    const filterRef = useRef(filter);

    const [state, setState] = useAtom(atom);

    useEffect(() => {
        events.addEventListener('message', event => {
            setState(state => {
                const data = JSON.parse((event as any).data) as StateEvent<T>;

                if (!filterRef.current(data)) {
                    return state;
                } else {
                    return listReducer(state, data);
                }
            });
        });
    }, [events, filter, setState]);

    return [state, setState] as [typeof state, typeof setState];
}

export function listReducer<T extends { id: string }>(
    state: T[],
    action: StateAction<T>
): T[] {
    const { type, data } = action;

    switch (type) {
        case 'insert':
            return state.concat(data);

        case 'update':
            return state.filter(i => i.id !== data.id ? i : { ...i, ...data });

        case 'delete': 
            return state.filter(i => i.id !== data.id);

        default:
            return state;
    }
}

export function useRecordState<T extends { id: string }>(
    atom: PrimitiveAtom<Record<string, T>>,
    events: EventTarget,
    filter: (event: StateEvent<T>) => boolean
) {
    const filterRef = useRef(filter);

    const [state, setState] = useAtom(atom);

    useEffect(() => {
        events.addEventListener('message', event => {
            setState(state => {
                const data = JSON.parse((event as any).data) as StateEvent<T>;

                if (!filterRef.current(data)) {
                    return state;
                } else {
                    return recordReducer(state, data);
                }
            });
        });
    }, [events, filter, setState]);

    return [state, setState] as [typeof state, typeof setState];
}

export function recordReducer<T extends { id: string }>(
    state: Record<string, T>,
    action: StateAction<T>
): Record<string, T> {
    const { type, data } = action;

    switch (type) {
        case 'insert':
            return {
                ...state,
                [data.id]: data
            };

        case 'update':
            return {
                ...state,
                [data.id]: data
            };

        case 'delete': {
            const { [data.id]: _, ...rest } = state;
            return rest;
        }

        default:
            return state;
    }
}

export function useSingleState<T extends { id: string }>(
    atom: PrimitiveAtom<T | null>,
    events: EventTarget,
    filter: (event: StateEvent<T>) => boolean
) {
    const filterRef = useRef(filter);

    const [state, setState] =  useAtom(atom);

    useEffect(() => {
        events.addEventListener('message', event => {
            setState(state => {
                const data = JSON.parse((event as any).data) as StateEvent<T>;

                if (!filterRef.current(data)) {
                    return state;
                } else {
                    return singleReducer(state, data);
                }
            });
        });
    }, [events, filter, setState]);

    return [state, setState] as [typeof state, typeof setState];
}

export function singleReducer<T extends { id: string }>(
    state: T | null,
    action: StateAction<T>
): T | null {
    const { type, data } = action;

    switch (type) {
        case 'update':
            return state && state.id === data.id
                ? ({ ...state, ...data })
                : state;

        case 'delete':
            return state && state.id === data.id
                ? null
                : state;

        default:
            return state;
    }
}