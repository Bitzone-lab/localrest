import DataFreeze from '../data_types/DataFreeze'
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
   * @param pedding Pending to accept or cancel the creation of this data
   * @returns Returns the data with its respective generated id
   */
  add(body: T, pedding: boolean = false): T & { id: number } {
    const id: number = this.generator.getID()

    const localData: LocalData<T, K> = new LocalData(body, this.defaultHelper)

    if (pedding) {
      localData.freeze = new DataFreeze(body, 'added')
    }

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
   * @param pedding Pending to accept or cancel the update of this data
   */
  update(id: number, body: Partial<Record<keyof T, any>>, pedding: boolean = false): boolean {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
    if (data === undefined) return false

    if (data instanceof SystemData && !data.isDeleted()) {
      if (pedding && data.freeze === undefined) {
        data.freeze = new DataFreeze({ ...data.get() }, 'updated', data.hasChange())
      }
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
   * @param pedding Pending to accept or cancel the delete of this data
   * @returns If it does not find the data, it returns false
   */
  delete(id: number, pedding: boolean = false): boolean {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
    if (data === undefined) return false

    if (data instanceof SystemData && !data.isDeleted()) {
      if (pedding && data.freeze === undefined) {
        data.freeze = new DataFreeze(data.get(), 'deleted')
      }
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

  accept(id?: number): boolean {
    let has = false
    if (id !== undefined) {
      const data = this.collections.get(id)
      if (data && data.freeze instanceof DataFreeze) {
        data.freeze = undefined
        has = true
      }
      return has
    }

    this.collections.forEach(function (data) {
      if (data.freeze instanceof DataFreeze) {
        data.freeze = undefined
        has = true
      }
    })
    return has
  }

  cancel(id?: number) {
    let has = false

    const processData = (data: SystemData<T, K> | LocalData<T, K>, _id: number) => {
      if (data.freeze instanceof DataFreeze) {
        switch (data.freeze.type) {
          case 'added':
            this.collections.delete(_id)
            has = true
            break
          case 'updated':
            if (data instanceof SystemData) {
              data.willBeNotUpdated(data.freeze.get(), data.freeze.hadChangeBefore())
              data.freeze = undefined
              has = true
            }
            break
          case 'deleted':
            if (data instanceof SystemData) {
              data.freeze = undefined
              data.willBeNotDeleted()
              has = true
            }
            break
        }
      }
    }

    if (id !== undefined) {
      const data = this.collections.get(id)
      if (data !== undefined) {
        processData(data, id)
      }
      return has
    } else {
      this.collections.forEach((data, id) => {
        processData(data, id)
      })
      return has
    }
  }
}
