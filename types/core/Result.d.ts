import LocalData from '../data_types/LocalData';
import SystemData from '../data_types/SystemData';
export default class Result<T, K> {
    protected dataMap: Map<number, SystemData<T, K> | LocalData<T, K>>;
    constructor(data: Map<number, LocalData<T, K> | SystemData<T, K>>);
    toDelete(): Array<T>;
    toUpdate(): Array<T>;
    toAdd(): Array<T>;
    all(): Array<T>;
    get hasToUpdate(): Boolean;
    get hasToDelete(): Boolean;
    get hasToAdd(): boolean;
}
