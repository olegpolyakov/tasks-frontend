export function toRecord<T extends {id: number | string}>(list: T[]): Record<string, T> {
    return list.reduce((record, item) => ({
        ...record,
        [item.id]: item
    }), {});
}