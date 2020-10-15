import DataListExtendsInterface from '../interfaces/DataListExtendsInterface'
import Data from './Data'

export default class SystemData<T extends DataListExtendsInterface, K> extends Data<T, K> {
  private deleted: boolean = false
  private updated: boolean = false

  constructor(value: T, mode?: K) {
    super(value, mode)
  }

  willBeDeleted() {
    this.deleted = true
  }

  willBeUpdated(body: Object) {
    this.value = {
      ...this.value,
      ...body,
      id: this.value.id
    }
    this.updated = true
  }

  isDeleted(): boolean {
    return this.deleted
  }

  isUpdated(): boolean {
    return this.updated
  }
}
