import LocalData from '../data_types/LocalData'
import SystemData from '../data_types/SystemData'
import { generator } from '../utils'
import Store from './Store'

export default class Methods<T, K> extends Store<T, K> {
  protected generator = generator()

  set(id: number, body: T, helper?: K): T & { id: number } {
    const systemData: SystemData<T, K> = new SystemData(body, helper || this.defaultHelper)
    this.collections.set(id, systemData)
    return {
      ...systemData.get(),
      id
    }
  }

  get(id: number): (T & { id: number }) | null {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
    if (data === undefined) return null

    return {
      ...data.get(),
      id
    }
  }

  add(body: T): T & { id: number } {
    const id: number = this.generator.getID()

    const localData: LocalData<T, K> = new LocalData(body, this.defaultHelper)
    this.collections.set(id, localData)
    return {
      ...localData.get(),
      id
    }
  }

  update(id: number, body: Partial<Record<keyof T, any>>): boolean {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
    if (data === undefined) return false

    if (data instanceof SystemData) {
      data.willBeUpdated(body)
    }

    if (data instanceof LocalData) {
      data.update(body)
    }

    return true
  }

  delete(id: number): boolean {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
    if (data === undefined) return false

    if (data instanceof SystemData) {
      data.willBeDeleted()
    } else {
      this.collections.delete(id)
    }
    return true
  }

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

  get size(): number {
    return this.list().length
  }

  /**
   * Maping list
   * @param callbackfn iterator
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
