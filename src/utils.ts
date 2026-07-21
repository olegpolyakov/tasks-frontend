// TODO Move to a shared lib

export function toRecord<T extends {id: number | string}>(list: T[]): Record<string, T> {
    return list.reduce((record, item) => ({
        ...record,
        [item.id]: item
    }), {});
}

export function capitalize(string: string) {
    return string.at(0)?.toUpperCase() + string.slice(1);
}