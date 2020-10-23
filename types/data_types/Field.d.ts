export default class Field<T> {
    private _value;
    private backup;
    constructor(value: T);
    hasChange(): boolean;
    update(value: T): void;
    get value(): T;
    reset(): void;
}
