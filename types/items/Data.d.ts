export default class Data<T, K> {
    private data;
    private id;
    private helper?;
    constructor(id: number | null, data: T, helper?: K);
    hasId(): boolean;
    get(): {
        data: T;
        helper: K | undefined;
        id: number | null;
    };
}
