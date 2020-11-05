import DataBase from './DataBase';
export default class LocalData<T, K> extends DataBase<T, K> {
    initialized: boolean;
    constructor(body: T, helper?: K);
    update(body: Partial<Record<keyof T, any>>): void;
}
