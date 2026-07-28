import { useEffect, useRef } from 'react';

import type { EntityAction } from './state';

export type StateEvent<T> = {
    model: string;
    action: 'insert' | 'update' | 'delete';
    documentId: string;
    data: T;
};

export function useStateEvents<T>(
    events: EventTarget,
    handler: (action: EntityAction<T>) => void
): void {
    const handlerRef = useRef(handler);

    useEffect(() => {
        events.addEventListener('message', event => {
            const data = JSON.parse((event as MessageEvent).data) as StateEvent<T>;
        
            handlerRef.current({
                type: `${data.model.toLowerCase()}/${data.action}`,
                data: data.data ? data.data : { id: data.documentId } as T
            });
        });
    }, [events]);
}