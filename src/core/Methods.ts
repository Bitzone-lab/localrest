import LocalData from '../data_types/LocalData'
import SystemData from '../data_types/SystemData'
import { generator } from '../utils'
import Store from './Store'

export default class Methods<T, K> extends Store<T, K> {
  protected generator = generator()

  set(id: number, body: T, helper?: K): boolean {
    const systemData: SystemData<T, K> = new SystemData(body, helper || this.defaultHelper)
    this.collections.set(id, systemData)
    return true
  }

  add(body: T): T {
    const id: number = this.generator.getID()

    const localData: LocalData<T, K> = new LocalData(body, this.defaultHelper)
    this.collections.set(id, localData)
    return localData.get()
  }

  update(id: number, body: any): boolean {
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

  list(): Array<T> {
    const list: Array<T> = []

    this.collections.forEach(function (data) {
      if (data instanceof SystemData && !data.isDeleted()) {
        list.push(data.get())
      }
    })

    return list
  }

  earch<L>(callbackfn: (data: T, id: number, helper?: K) => L): Array<L> {
    const list: Array<L> = []
    this.collections.forEach(function (data, id) {
      if (data instanceof SystemData && !data.isDeleted()) {
        list.push(callbackfn(data.get(), id, data.helper_value))
      }
    })

    return list
  }
}
