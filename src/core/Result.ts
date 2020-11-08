import DataFreeze from '../data_types/DataFreeze'
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
      if (data instanceof SystemData && data.isDeleted() && data.freeze === undefined) {
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
      if (data instanceof SystemData && data.isUpdated() && data.freeze === undefined) {
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
      if (data instanceof LocalData && data.freeze === undefined) {
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
      if (data.freeze !== undefined) {
        switch (data.freeze.type) {
          case 'added':
            break
          case 'deleted':
            dataList.push(data.get())
            break
          case 'updated':
            dataList.push(data.freeze.get())
            break
        }
      } else {
        dataList.push(data.get())
      }
    })

    return dataList
  }

  /**
   *  Mapping all list of data. As the second parameter of the callback, it returns a help if it has been removed, updated, added or without any action
   * @param callbackfn A function that accepts up to two arguments. Data, to. The callback also works as a filter, if you don't return anything it will filter this data.
   * @example
   * const list = localRest.result().mapping(function(data, to){
   *  if(to === 'deleted') return
   *  return data
   * })
   */
  mapping<L>(
    callbackfn: (data: T, to: 'deleted' | 'updated' | 'added' | 'nothing') => L | void
  ): Array<L> {
    const dataList: Array<L> = []
    this.dataMap.forEach((data) => {
      let result = undefined
      if (data.freeze instanceof DataFreeze) {
        switch (data.freeze.type) {
          case 'added':
            break
          case 'updated':
            result = callbackfn(data.freeze.get(), data.freeze.type)
            break
          case 'deleted':
            result = callbackfn(data.get(), data.freeze.type)
            break
        }
      } else if (data instanceof SystemData) {
        if (data.isDeleted()) {
          result = callbackfn(data.get(), 'deleted')
        } else if (data.isUpdated()) {
          result = callbackfn(data.get(), 'updated')
        } else {
          result = callbackfn(data.get(), 'nothing')
        }
      } else {
        result = callbackfn(data.get(), 'added')
      }

      if (result !== undefined) {
        dataList.push(result)
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
      if (data instanceof SystemData && data.isUpdated() && data.freeze === undefined) {
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
      if (data instanceof SystemData && data.isDeleted() && data.freeze === undefined) {
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
      if (data instanceof LocalData && data.freeze === undefined) {
        has = true
      }
    })
    return has
  }
}
