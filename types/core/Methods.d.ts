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
     * @param pendding Pending to accept or cancel the creation of this data
     * @returns Returns the data with its respective generated id
     */
    add(body: T, pendding?: boolean): T & {
        id: number;
    };
    /**
     * Update specific fields of a data by its id
     * @param id data id
     * @param body field for update
     * @param pendding Pending to accept or cancel the update of this data
     */
    update(id: number, body: Partial<Record<keyof T, any>>, pendding?: boolean): boolean;
    /**
     * Delete a data from the list
     * @param id data id
     * @param pendding Pending to accept or cancel the delete of this data
     * @returns If it does not find the data, it returns false
     */
    delete(id: number, pendding?: boolean): boolean;
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
    /**
     * Confirm pending data
     * @param id You can confirm a specific data by its id
     * @returns It will return a false if the data has already been confirmed or canceled
     */
    confirm(id?: number): boolean;
    /**
     * Cancel pending data
     * @param id You can cancel a specific data by its id
     * @returns It will return a false if the data has already been confirmed or canceled
     */
    cancel(id?: number): boolean;
    /**
     * Retorna el valor actual del dato pero si es un dato pendiente solo te retornará su valor antes de la actualización hasta que se haya dado por confirmado.
     * @param id data id
     * @param fieldname field name
     * @returns It will return undefined if there the name of the field does not exist
     */
    frozen<L extends keyof T>(id: number, fieldname?: L): T[L] | (T & {
        id: number;
    }) | undefined;
}
