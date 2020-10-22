import Methods from './core/Methods'
import Result from './core/Result'
import LocalData from './data_types/LocalData'
import SystemData from './data_types/SystemData'
import Data from './items/Data'

export default class LocalRest<T, K> extends Methods<T, K> {
  constructor(initial_list: Array<Data<T, K>> = [], helper?: K) {
    super()
    this.init(initial_list, helper)
  }

  init(initial_list: Array<Data<T, K>> = [], helper?: K) {
    this.defaultHelper = helper
    this.collections.clear()
    initial_list.map((data) => {
      const result = data.get()

      if (result.id) {
        const systemData: SystemData<T, K> = new SystemData(
          result.data,
          result.helper || this.defaultHelper
        )
        this.collections.set(result.id, systemData)
      } else {
        const localData: LocalData<T, K> = new LocalData(
          result.data,
          result.helper || this.defaultHelper
        )
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

  result(): Result<T, K> {
    return new Result(this.collections)
  }
}
