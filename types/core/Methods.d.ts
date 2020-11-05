import Store from './Store';
export default class Methods<T, K> extends Store<T, K> {
    protected generator: {
        getID: () => number;
    };
    /**
     * Add a new existing data from a database
     * @param id data system id
     * @param body data body
     * @param helper helper for only this data (Optional)
     * @returns returns the same data
     */
    set(id: number, body: T, helper?: K): T & {
        id: number;
    };
    /**
     * Returns a data for its id
     * @param id data id
     * @returns data object. In case it does not exist, it returns null
     */
    get(id: number): (T & {
        id: number;
    }) | null;
    /**
     * Create a new data and generate an id
     * @param body new data body
     * @param pedding Pending to accept or cancel the creation of this data
     * @returns Returns the data with its respective generated id
     */
    add(body: T, pedding?: boolean): T & {
        id: number;
    };
    /**
     * Update specific fields of a data by its id
     * @param id data id
     * @param body field for update
     * @param pedding Pending to accept or cancel the update of this data
     */
    update(id: number, body: Partial<Record<keyof T, any>>, pedding?: boolean): boolean;
    /**
     * Delete a data from the list
     * @param id data id
     * @param pedding Pending to accept or cancel the delete of this data
     * @returns If it does not find the data, it returns false
     */
    delete(id: number, pedding?: boolean): boolean;
    /**
     * Returns the current data list with its respective id
     * @returns data list
     */
    list(): Array<T & {
        id: number;
    }>;
    /**
     * Count the listing data
     */
    get size(): number;
    /**
     * Data mapping, where you also obtain the validations and the helper of each data.
     * @param callbackfn A function that accepts up to three arguments. Data, validations and helper
     * @returns Calls a defined callback function on each element of an array, and returns an array that contains the results.
     * @example
     * localrest.each(function(data, valid, helper) {
     *  return data
     * })
     */
    each<L>(callbackfn: (data: T & {
        id: number;
    }, validation: Partial<Record<keyof T, string>>, helper?: K) => L): Array<L>;
    accept(id?: number): boolean;
    cancel(id?: number): boolean;
}
