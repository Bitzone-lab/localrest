import LocalData from './DataManagement/LocalData'
import SystemData from './DataManagement/SystemData'
import DataListExtendsInterface from './interfaces/DataListExtendsInterface'
import Store from './Store'

export default class Localrest<T extends DataListExtendsInterface, K> extends Store<T, K> {
  constructor(dataList: Array<T> = [], defaultMode?: K) {
    super(dataList, defaultMode)
  }

  add(body: T, mode?: K): T {
    const ID: number | string = this.generateID()
    const data = { ...body, id: ID }

    const localData: LocalData<T, K> = new LocalData(data, mode || this.defaultMode)
    this.dataMap.set(ID, localData)
    return data
  }

  get(id: number | string): T | null {
    const data = this.dataMap.get(id)
    if (data === undefined) return null

    if (data instanceof SystemData && data.isDeleted) {
      return null
    }

    return { ...data.get(), id }
  }

  update(id: number | string, body: Object): boolean {
    const data = this.dataMap.get(id)
    if (data === undefined) return false

    if (data instanceof LocalData) {
      data.update({ ...data.get(), ...body })
    }

    if (data instanceof SystemData) {
      data.willBeUpdated({
        ...data.get(),
        ...body,
        id
      })
    }
    return true
  }

  delete(id: number | string): boolean {
    const data = this.dataMap.get(id)
    if (data === undefined) return false

    if (data instanceof SystemData) {
      data.willBeDeleted()
      return true
    }

    return this.dataMap.delete(id)
  }

  set(id: number | string, body: T, mode?: K) {
    const systemData: SystemData<T, K> = new SystemData({ ...body }, mode || this.defaultMode)
    this.dataMap.set(id, systemData)
  }

  list(): Array<T> {
    const dataList: Array<T> = []
    this.dataMap.forEach((data, id) => {
      if (data instanceof SystemData && !data.isDeleted) {
        dataList.push({ ...data.get(), id })
      } else if (data instanceof LocalData) {
        dataList.push({ ...data.get(), id })
      }
    })

    return dataList
  }

  map<L>(callbackfn: (data: T, id: string | number, mode?: K) => L): Array<L> {
    const dataList: Array<L> = []
    this.dataMap.forEach((data, id) => {
      if (data instanceof SystemData && !data.isDeleted) {
        dataList.push(callbackfn(data.get(), id, data.mode))
      } else if (data instanceof LocalData) {
        dataList.push(callbackfn(data.get(), id, data.mode))
      }
    })

    return dataList
  }
}
