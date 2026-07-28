import { createContext, useContext } from 'react';

import { type Atom, useAtomValue } from 'jotai';

export type Store = {
    get(name: string): void;
    set<T>(name: string, atom: Atom<T>): void;
};

export const StoreContext = createContext<Store>(new Map());

export function createStore() {
    const state = new Map<string, Atom<unknown>>();

    return {
        get(name: string) {
            return state.get(name);
        },
        
        set<T>(name: string, atom: Atom<T>) {
            state.set(name, atom);
        }
    };
}

export function useStore<T>(key: string) {
    const store = useContext(StoreContext);
    const value = useAtomValue<T>(store.get(key)! as Atom<T>);

    return value;
}