import LocalData from '../data_types/LocalData'
import SystemData from '../data_types/SystemData'
import { generator } from '../utils'
import Store from './Store'

export default class Methods<T, K> extends Store<T, K> {
  protected generator = generator()

  /**
   * Add a new existing data from a database
   * @param id data system id
   * @param body data body
   * @param helper helper for only this data (Optional)
   * @returns returns the same data
   */
  set(id: number, body: T, helper?: K): T & { id: number } {
    const systemData: SystemData<T, K> = new SystemData(body, helper || this.defaultHelper)
    this.collections.set(id, systemData)
    return {
      ...systemData.get(),
      id
    }
  }

  /**
   * Returns a data for its id
   * @param id data id
   * @returns data object. In case it does not exist, it returns null
   */
  get(id: number): (T & { id: number }) | null {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
    if (data === undefined) return null
    if (data instanceof SystemData && data.isDeleted()) return null

    return {
      ...data.get(),
      id
    }
  }

  /**
   * Create a new data and generate an id
   * @param body new data body
   * @returns Returns the data with its respective generated id
   */
  add(body: T): T & { id: number } {
    const id: number = this.generator.getID()

    const localData: LocalData<T, K> = new LocalData(body, this.defaultHelper)
    this.collections.set(id, localData)
    return {
      ...localData.get(),
      id
    }
  }

  /**
   * Update specific fields of a data by its id
   * @param id data id
   * @param body field for update
   */
  update(id: number, body: Partial<Record<keyof T, any>>): boolean {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
    if (data === undefined) return false

    if (data instanceof SystemData && !data.isDeleted()) {
      data.willBeUpdated(body)
    } else if (data instanceof SystemData && data.isDeleted()) {
      return false
    }

    if (data instanceof LocalData) {
      data.update(body)
    }

    return true
  }

  /**
   * Delete a data from the list
   * @param id data id
   * @returns If it does not find the data, it returns false
   */
  delete(id: number): boolean {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
    if (data === undefined) return false

    if (data instanceof SystemData && !data.isDeleted()) {
      data.willBeDeleted()
    } else if (data instanceof SystemData && data.isDeleted()) {
      return false
    } else {
      this.collections.delete(id)
    }
    return true
  }

  /**
   * Returns the current data list with its respective id
   * @returns data list
   */
  list(): Array<T & { id: number }> {
    const list: Array<T & { id: number }> = []

    this.collections.forEach(function (data, id) {
      if (data instanceof SystemData && !data.isDeleted()) {
        list.push({ ...data.get(), id })
      } else if (data instanceof LocalData) {
        list.push({ ...data.get(), id })
      }
    })

    return list
  }

  /**
   * Count the listing data
   */
  get size(): number {
    return this.list().length
  }

  /**
   * Data mapping, where you also obtain the validations and the helper of each data.
   * @param callbackfn A function that accepts up to three arguments. Data, validations and helper
   * @returns Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @example
   * localrest.each(function(data, valid, helper) {
   *  return data
   * })
   */
  each<L>(
    callbackfn: (
      data: T & { id: number },
      validation: Partial<Record<keyof T, string>>,
      helper?: K
    ) => L
  ): Array<L> {
    const list: Array<L> = []
    this.collections.forEach(function (data, id) {
      if (data instanceof SystemData && !data.isDeleted()) {
        list.push(callbackfn({ ...data.get(), id }, { ...data.validations }, data.helper_value))
      } else if (data instanceof LocalData) {
        list.push(callbackfn({ ...data.get(), id }, { ...data.validations }, data.helper_value))
      }
    })

    return list
  }
}
