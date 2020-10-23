import LocalData from '../data_types/LocalData';
import SystemData from '../data_types/SystemData';
export default class Result<T, K> {
    protected dataMap: Map<number, SystemData<T, K> | LocalData<T, K>>;
    constructor(data: Map<number, LocalData<T, K> | SystemData<T, K>>);
    /**
     * Returns a list of data that was deleted. Only system data appears
     * @returns List of data deleted
     */
    toDelete(): Array<T>;
    /**
     * Returns a list of data that was updated. Only system data appears
     * @returns List of data updated
     */
    toUpdate(): Array<T>;
    /**
     * Returns a list of data that was added
     * @returns List of data added
     */
    toAdd(): Array<T>;
    /**
     * Returns all updated, deleted, added and initialized data
     * @returns All list of data
     */
    all(): Array<T>;
    /**
     * Check for updated data. Only system data appears
     */
    get hasToUpdate(): Boolean;
    /**
     * Check for deleted data. Only system data appears
     */
    get hasToDelete(): Boolean;
    /**
     * Check for added data.
     */
    get hasToAdd(): boolean;
}