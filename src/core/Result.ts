import LocalData from '../data_types/LocalData'
import SystemData from '../data_types/SystemData'

export default class Result<T, K> {
  protected dataMap: Map<number, SystemData<T, K> | LocalData<T, K>> = new Map()

  constructor(data: Map<number, LocalData<T, K> | SystemData<T, K>>) {
    this.dataMap = data
  }

  toDelete(): Array<T> {
    const dataList: Array<T> = []
    this.dataMap.forEach((data) => {
      if (data instanceof SystemData && data.isDeleted()) {
        dataList.push(data.get())
      }
    })

    return dataList
  }

  toUpdate(): Array<T> {
    const dataList: Array<T> = []
    this.dataMap.forEach((data) => {
      if (data instanceof SystemData && data.isUpdated()) {
        dataList.push(data.get())
      }
    })

    return dataList
  }

  toAdd(): Array<T> {
    const dataList: Array<T> = []
    this.dataMap.forEach((data) => {
      if (data instanceof LocalData) {
        dataList.push(data.get())
      }
    })

    return dataList
  }

  all(): Array<T> {
    const dataList: Array<T> = []
    this.dataMap.forEach((data) => {
      dataList.push(data.get())
    })

    return dataList
  }

  get hasToUpdate(): Boolean {
    let has = false
    this.dataMap.forEach((data) => {
      if (data instanceof SystemData && data.isUpdated()) {
        has = true
      }
    })
    return has
  }

  get hasToDelete(): Boolean {
    let has = false
    this.dataMap.forEach((data) => {
      if (data instanceof SystemData && data.isDeleted()) {
        has = true
      }
    })
    return has
  }
}
