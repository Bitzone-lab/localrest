import DataListExtendsInterface from '../interfaces/DataListExtendsInterface'
import Data from './Data'

export default class LocalData<T extends DataListExtendsInterface, K> extends Data<T, K> {
  constructor(value: T, mode?: K) {
    super(value, mode)
  }

  update(body: Object) {
    const value = {
      ...this.value,
      ...body
    }

    delete value.id
    this.value = value
  }
}
