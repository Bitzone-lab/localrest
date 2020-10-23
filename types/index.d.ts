import Methods from './core/Methods';
import Result from './core/Result';
/**
 * It is a library that simulates an api but locally, supports the verification of the data events and returns them in a result. It also contributes to the validations
 * @template T listing data
 * @template K helper, It is an extra information that you want to assign to each data in the list
 */
export default class LocalRest<T = Object, K = ''> extends Methods<T, K> {
    /**
     * Initialize a list data list
     * @param initial_list List of data with which you want to start (Optional)
     * @param helper a helper for all data by default (Optional)
     * @example
     * localrest.init([
     *  { name: 'Juan', age: 5 },
     *  { id: 7, name: 'Ana', age: 15 }
     * ])
     */
    constructor(initial_list?: Array<T & {
        id?: number;
    }>, helper?: K);
    /**
     * Initialize a list data list
     * @param initial_list List of data with which you want to start (Optional)
     * @param helper a helper for all data by default (Optional)
     * @example
     * localrest.init([
     *  { name: 'Juan', age: 5 },
     *  { id: 7, name: 'Ana', age: 15 }
     * ])
     */
    init(initial_list?: Array<T & {
        id?: number;
    }>, helper?: K): void;
    /**
     * It is in charge of resetting values
     * @param to choose which one you want to restart. It is also possible to reset a data by its identifier
     * @returns In case it does not find the data, it returns false
     * @example
     * localrest.reset('list')
     * localrest.reset('validations')
     * localrest.reset('helper')
     * localrest.reset('all')
     * localrest.reset(1) // id
     */
    reset(to?: 'validations' | 'list' | 'helper' | 'all' | number): boolean;
    /**
     * Enter a validation message for a specific field of data
     * @param id data id
     * @param fieldname fieldname of data
     * @param message A message you want to add
     * @returns In case it does not find the data, it returns false
     * @example
     * localrest.valid(id, 'fieldname', 'My message')
     */
    valid<L extends keyof T>(id: number, fieldname: L, message: string): boolean;
    /**
     * Enter validation message for multiple fields
     * @param id data id
     * @param valids list of data fields with their respective validation message
     * @returns In case it does not find the data, it returns false
     * @example
     * localrest.validation(id, {
     *  name: 'Name is required',
     *  age: 'The age its not number'
     * })
     */
    validation<L extends keyof T>(id: number, valids: Partial<Record<L, string>>): boolean;
    /**
     * It helps to check if there are updates in the entire list, a data or only a field of a specific data
     * @param id data id (Optional)
     * @param fieldname Name of the field you want to check if it had an update (Optional)
     * @returns returns false in case the data does not exist by id, by fieldname and has no update
     * @example
     * localrest.hasChange(id, 'fieldname')
     */
    hasChange<L extends keyof T>(id?: number, fieldname?: L): boolean;
    /**
     * Returns the specific fields that had updates
     * @param id data id
     * @returns fields object that had an update
     */
    whoChange(id: number): Object;
    /**
     * It helps to update the helper and also returns your current helper. The second parameter is optional if you only want to get the helper
     * @param id data id
     * @param helper New value for the helper
     * @returns current helper of data
     * @example
     * localrest.helper(id, 'MODE_2')
     */
    helper(id: number, helper?: K): K | null;
    /**
     * Returns functionalities on the final result
     * @example
     * const result = localrest.result()
     * result.toDelete()
     * result.toUpdate()
     * result.toAdd()
     * result.all()
     * result.hasToDelete
     * result.hasToUpdate
     * result.hasToAdd
     */
    result(): Result<T, K>;
}
