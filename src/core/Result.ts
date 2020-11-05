import LocalData from '../data_types/LocalData'
import SystemData from '../data_types/SystemData'

export default class Result<T, K> {
  protected dataMap: Map<number, SystemData<T, K> | LocalData<T, K>> = new Map()

  constructor(data: Map<number, LocalData<T, K> | SystemData<T, K>>) {
    this.dataMap = data
  }

  /**
   * Returns a list of data that was deleted. Only system data appears
   * @returns List of data deleted
   */
  toDelete(): Array<T> {
    const dataList: Array<T> = []
    this.dataMap.forEach((data) => {
      if (data instanceof SystemData && data.isDeleted()) {
        dataList.push(data.get())
      }
    })

    return dataList
  }

  /**
   * Returns a list of data that was updated. Only system data appears
   * @returns List of data updated
   */
  toUpdate(): Array<T> {
    const dataList: Array<T> = []
    this.dataMap.forEach((data) => {
      if (data instanceof SystemData && data.isUpdated()) {
        dataList.push(data.get())
      }
    })

    return dataList
  }

  /**
   * Returns a list of data that was added
   * @returns List of data added
   */
  toAdd(): Array<T> {
    const dataList: Array<T> = []
    this.dataMap.forEach((data) => {
      if (data instanceof LocalData) {
        dataList.push(data.get())
      }
    })

    return dataList
  }

  /**
   * Returns all updated, deleted, added and initialized data
   * @returns All list of data
   */
  all(): Array<T> {
    const dataList: Array<T> = []
    this.dataMap.forEach((data) => {
      dataList.push(data.get())
    })

    return dataList
  }

  /**
   *  Mapping all list of data. As the second parameter of the callback, it returns a help if it has been removed, updated, added or without any action
   * @param callbackfn A function that accepts up to two arguments. Data, to.
   */
  mapping<L>(
    callbackfn: (data: T, to: 'deleted' | 'updated' | 'added' | 'nothing') => L
  ): Array<L> {
    const dataList: Array<L> = []
    this.dataMap.forEach((data) => {
      if (data instanceof SystemData) {
        if (data.isDeleted()) {
          dataList.push(callbackfn(data.get(), 'updated'))
        } else if (data.isUpdated()) {
          dataList.push(callbackfn(data.get(), 'deleted'))
        } else {
          dataList.push(callbackfn(data.get(), 'nothing'))
        }
      } else {
        dataList.push(callbackfn(data.get(), 'added'))
      }
    })
    return dataList
  }

  /**
   * Check for updated data. Only system data appears
   */
  get hasToUpdate(): Boolean {
    let has = false
    this.dataMap.forEach((data) => {
      if (data instanceof SystemData && data.isUpdated()) {
        has = true
      }
    })
    return has
  }

  /**
   * Check for deleted data. Only system data appears
   */
  get hasToDelete(): Boolean {
    let has = false
    this.dataMap.forEach((data) => {
      if (data instanceof SystemData && data.isDeleted()) {
        has = true
      }
    })
    return has
  }

  /**
   * Check for added data.
   */
  get hasToAdd(): boolean {
    let has = false
    this.dataMap.forEach((data) => {
      if (data instanceof LocalData) {
        has = true
      }
    })
    return has
  }
}
