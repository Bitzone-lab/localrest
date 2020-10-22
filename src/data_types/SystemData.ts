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

  willBeUpdated(body: Partial<Record<keyof T, any>>) {
    this.value = {
      ...this.get(),
      ...body
    }

    for (const key in body) {
      this.fields[key].update(body[key])
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
