import Methods from './core/Methods'
import Result from './core/Result'
import LocalData from './data_types/LocalData'
import SystemData from './data_types/SystemData'

/**
 * It is a library that simulates an api but locally, supports the verification of the data events and returns them in a result. It also contributes to the validations
 * @template T listing data
 * @template K helper, It is an extra information that you want to assign to each data in the list
 */
export default class LocalRest<T = Object, K = undefined> extends Methods<T, K> {
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
  constructor(initial_list: Array<T & { id?: number }> = [], helper?: K) {
    super()
    this.init(initial_list, helper)
  }

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
  init(initial_list: Array<T & { id?: number }> = [], helper?: K) {
    this.defaultHelper = helper
    this.collections.clear()
    initial_list.map((data) => {
      if (data.id) {
        const systemData: SystemData<T, K> = new SystemData(data, this.defaultHelper)
        this.collections.set(data.id, systemData)
      } else {
        const localData: LocalData<T, K> = new LocalData(data, this.defaultHelper)
        localData.initialized = true
        this.collections.set(this.generator.getID(), localData)
      }
    })
  }

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
  reset(to: 'validations' | 'list' | 'helper' | 'all' | number = 'all'): boolean {
    switch (to) {
      case 'validations':
        this.collections.forEach(function (data) {
          data.restartValidation()
        })
        return true
      case 'helper':
        this.collections.forEach((data) => {
          data.helper_value = this.defaultHelper
        })
        return true
      case 'list':
        this.collections.clear()
        return true
      case 'all':
        this.collections.forEach(function (data) {
          data.restartValidation()
        })
        this.collections.clear()
        this.collections.forEach((data) => {
          data.helper_value = this.defaultHelper
        })
        return true
      default:
        if (Number.isInteger(to)) {
          const data: LocalData<T, K> | SystemData<T, K> | undefined = this.collections.get(to)
          if (data instanceof SystemData && data.isDeleted()) return false

          if (data === undefined) return false
          data.reset()
          return true
        }
        return false
    }
  }

  /**
   * Enter a validation message for a specific field of data
   * @param id data id
   * @param fieldname fieldname of data
   * @param message A message you want to add (Optional)
   * @returns In case it does not find the data, it returns null
   * @example
   * localrest.valid(id, 'fieldname', 'My message')
   */
  valid<L extends keyof T>(id: number, fieldname: L, message?: string): string | null {
    const data: LocalData<T, K> | SystemData<T, K> | undefined = this.collections.get(id)

    if (data instanceof SystemData && data.isDeleted()) return null

    if (data === undefined) return null

    if (message !== undefined) {
      return data.valid(fieldname, message)
    } else {
      return data.valid(fieldname)
    }
  }

  /**
   * Enter validation message for multiple fields
   * @param id data id
   * @param valids list of data fields with their respective validation message
   * @returns In case it does not find the data, it returns empty object
   * @example
   * localrest.validation(id, {
   *  name: 'Name is required',
   *  age: 'The age its not number'
   * })
   */
  validation<L extends keyof T>(
    id: number,
    valids?: Partial<Record<L, string>>
  ): Partial<Record<keyof T, string>> {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
    if (data instanceof SystemData && data.isDeleted()) return {}

    if (data !== undefined && valids !== undefined) {
      for (const key in valids) {
        const message: string = (valids[key] as string) || ''
        data.valid(key, message)
      }
      return { ...data.validations }
    } else if (data !== undefined) {
      return { ...data.validations }
    }

    return {}
  }

  /**
   * It helps to check if there are updates in the entire list, a data or only a field of a specific data
   * @param id data id (Optional)
   * @param fieldname Name of the field you want to check if it had an update (Optional)
   * @returns returns false in case the data does not exist by id, by fieldname and has no update
   * @example
   * localrest.hasChange(id, 'fieldname')
   */
  hasChange<L extends keyof T>(id?: number, fieldname?: L): boolean {
    let changes = false
    if (id) {
      const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)

      if (data instanceof SystemData && data.isDeleted()) return true

      if (data !== undefined) {
        changes = data.hasChange(fieldname)
      }
    } else {
      this.collections.forEach(function (data) {
        if (!changes) {
          if (data instanceof LocalData && !data.initialized) changes = true
          else if (data instanceof SystemData && data.isDeleted()) changes = true
          else changes = data.hasChange()
        }
      })
    }
    return changes
  }

  /**
   * Returns the specific fields that had updates
   * @param id data id
   * @returns fields object that had an update
   */
  whoChange(id: number): Partial<Record<keyof T, any>> {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
    const fields: Partial<Record<keyof T, any>> = {}
    if (data instanceof SystemData && data.isDeleted()) return fields
    if (data === undefined) return fields

    for (const fieldname in data.get()) {
      if (data.hasChange(fieldname)) {
        fields[fieldname] = data.get()[fieldname]
      }
    }

    return fields
  }

  /**
   * It helps to update the helper and also returns your current helper. The second parameter is optional if you only want to get the helper
   * @param id data id
   * @param helper New value for the helper
   * @returns current helper of data
   * @example
   * localrest.helper(id, 'MODE_2')
   */
  helper(id: number, helper?: K): K | null {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
    if (data === undefined) return null

    if (helper !== undefined) {
      return data.helper(helper) || null
    }

    const helper_value = data.helper()

    return helper_value === undefined ? null : helper_value
  }

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
  result(): Result<T, K> {
    return new Result(this.collections)
  }
}
