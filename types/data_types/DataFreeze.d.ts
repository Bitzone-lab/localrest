export default class DataFrezze<T> {
    private data_string;
    readonly type: 'added' | 'updated' | 'deleted';
    private changeBefore;
    constructor(data: T, type: 'added' | 'updated' | 'deleted', hasChange?: boolean);
    get(): T;
    hadChangeBefore(): boolean;
}
