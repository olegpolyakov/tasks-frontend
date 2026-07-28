export interface Entity {
    id: string;
}

export type EntityAction<T> = {
    type: string;
    data: T;
};

export const listReducer = <T extends Entity>(name: string) => (
    state: T[],
    action: EntityAction<T>
): T[] => {
    const { type, data } = action;

    switch (type) {
        case `${name}/insert`:
            return state.concat(data);

        case `${name}/update`:
            return state.map(i => i.id !== data.id ? i : { ...i, ...data });

        case `${name}/delete`: 
            return state.filter(i => i.id !== data.id);

        default:
            return state;
    }
};

export const recordReducer = <T extends Entity>(name: string) => (
    state: Record<string, T>,
    action: EntityAction<T>
): Record<string, T> => {
    const { type, data } = action;

    switch (type) {
        case `${name}/insert`:
            return {
                ...state,
                [data.id]: data
            };

        case `${name}/update`:
            return {
                ...state,
                [data.id]: data
            };

        case `${name}/delete`: {
            const { [data.id]: _, ...rest } = state;
            return rest;
        }

        default:
            return state;
    }
};

export const singleReducer = <T extends Entity>(name: string) => (
    state: T | null,
    action: EntityAction<T>
): T | null => {
    const { type, data } = action;

    switch (type) {
        case `${name}/update`:
            return state && state.id === data.id
                ? ({ ...state, ...data })
                : state;

        case `${name}/delete`:
            return state && state.id === data.id
                ? null
                : state;

        default:
            return state;
    }
};