import Methods from './core/Methods';
import Result from './core/Result';
export default class LocalRest<T = Object, K = ''> extends Methods<T, K> {
    constructor(initial_list?: Array<T & {
        id?: number;
    }>, helper?: K);
    init(initial_list?: Array<T & {
        id?: number;
    }>, helper?: K): void;
    reset(to?: 'validations' | 'list' | 'helper' | 'all' | number): boolean;
    valid<L extends keyof T>(id: number, fieldname: L, message: string): boolean;
    validation<L extends keyof T>(id: number, valids: Partial<Record<L, string>>): boolean;
    hasChange<L extends keyof T>(id?: number, fieldname?: L): boolean;
    whoChange(id: number): Object;
    helper(id: number, helper?: K): K | null;
    result(): Result<T, K>;
}
