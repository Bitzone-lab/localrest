import Store from './Store';
export default class Methods<T, K> extends Store<T, K> {
    protected generator: {
        getID: () => number;
    };
    set(id: number, body: T, helper?: K): T & {
        id: number;
    };
    get(id: number): (T & {
        id: number;
    }) | null;
    add(body: T): T & {
        id: number;
    };
    update(id: number, body: Partial<Record<keyof T, any>>): boolean;
    delete(id: number): boolean;
    list(): Array<T & {
        id: number;
    }>;
    get size(): number;
    /**
     * Maping list
     * @param callbackfn iterator
     */
    each<L>(callbackfn: (data: T & {
        id: number;
    }, validation: Partial<Record<keyof T, string>>, helper?: K) => L): Array<L>;
}
