import DataBase from './DataBase';
export default class SystemData<T, K> extends DataBase<T, K> {
    private deleted;
    private updated;
    constructor(body: T, helper?: K);
    willBeDeleted(): void;
    willBeUpdated(body: Partial<Record<keyof T, any>>): void;
    willBeNotUpdated(): void;
    willBeNotDeleted(): void;
    isDeleted(): boolean;
    isUpdated(): boolean;
}
