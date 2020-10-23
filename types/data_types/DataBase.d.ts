import Field from './Field';
interface Fields<T> {
    [key: string]: T;
}
export default class DataBase<T, K> {
    protected value: T;
    helper_value?: K;
    validations: Partial<Record<keyof T, string>>;
    fields: Fields<Field<any>>;
    constructor(values: T, helper?: K);
    get(): T;
    /**
     * Update and return helper, update is optional
     * @param helper Helper
     */
    helper(helper?: K): K | undefined;
    valid<L extends keyof T>(field: L, message: string): void;
    restartValidation(): void;
    hasChange<L extends keyof T>(fieldname?: L): boolean;
    reset(): void;
}
export {};
