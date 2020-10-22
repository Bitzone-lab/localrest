import Methods from './core/Methods'
import Result from './core/Result'
import LocalData from './data_types/LocalData'
import SystemData from './data_types/SystemData'

export default class LocalRest<T = Object, K = ''> extends Methods<T, K> {
  constructor(initial_list: Array<T & { id?: number }> = [], helper?: K) {
    super()
    this.init(initial_list, helper)
  }

  init(initial_list: Array<T & { id?: number }> = [], helper?: K) {
    this.defaultHelper = helper
    this.collections.clear()
    initial_list.map((data) => {
      if (data.id) {
        const systemData: SystemData<T, K> = new SystemData(data, this.defaultHelper)
        this.collections.set(data.id, systemData)
      } else {
        const localData: LocalData<T, K> = new LocalData(data, this.defaultHelper)
        this.collections.set(this.generator.getID(), localData)
      }
    })
  }

  reset(to: 'validations' | 'list' | 'helper' | 'all' = 'all'): boolean {
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
        return false
    }
  }

  valid<L extends keyof T>(id: number, fieldname: L, message: string): boolean {
    const data: LocalData<T, K> | SystemData<T, K> | undefined = this.collections.get(id)

    if (data === undefined) return false

    data.valid(fieldname, message)
    return true
  }

  validation<L extends keyof T>(id: number, valids: Partial<Record<L, string>>): boolean {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)

    if (data !== undefined) {
      for (const key in valids) {
        const message: string = (valids[key] as string) || ''
        data.valid(key, message)
      }
      return true
    }
    return false
  }

  hasChange<L extends keyof T>(id?: number, fieldname?: L): boolean {
    let changes = false
    if (id) {
      const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
      if (data !== undefined) {
        changes = data.hasChange(fieldname)
      }
    } else {
      this.collections.forEach(function (data) {
        if (!changes) {
          changes = data.hasChange()
        }
      })
    }
    return changes
  }

  whoChange(id: number): Object {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
    const fields: { [key: string]: any } = {}
    if (data === undefined) return fields

    for (const fieldname in data.get()) {
      if (data.hasChange(fieldname)) {
        fields[fieldname] = data.get()[fieldname]
      }
    }

    return fields
  }

  helper(id: number, helper?: K): K | null {
    const data: SystemData<T, K> | LocalData<T, K> | undefined = this.collections.get(id)
    if (data === undefined) return null

    if (helper !== undefined) {
      return data.helper(helper) || null
    }

    const helper_value = data.helper()

    return helper_value === undefined ? null : helper_value
  }

  result(): Result<T, K> {
    return new Result(this.collections)
  }
}
