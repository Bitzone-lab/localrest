import DataBase from './DataBase'

export default class SystemData<T, K> extends DataBase<T, K> {
  private deleted: boolean = false
  private updated: boolean = false

  constructor(body: T, helper?: K) {
    super(body, helper)
  }

  willBeDeleted() {
    this.deleted = true
  }

  willBeUpdated(body: Object) {
    if (typeof body === 'object') {
      this.value = {
        ...this.get(),
        ...body
      }
    } else {
      this.value = body
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
