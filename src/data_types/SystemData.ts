import DataBase from './DataBase'
import Field from './Field'

export default class SystemData<T, K> extends DataBase<T, K> {
  private deleted: boolean = false
  private updated: boolean = false

  constructor(body: T, helper?: K) {
    super({ ...body }, helper)
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
      if (this.fields[key] === undefined) {
        const field = new Field(body[key])
        field.setBackup(undefined)
        this.fields[key] = field
      } else {
        this.fields[key].update(body[key])
      }
    }

    this.updated = true
  }

  willBeNotUpdated() {
    this.reset()
    this.updated = false
  }

  willBeNotDeleted() {
    this.deleted = false
  }

  isDeleted(): boolean {
    return this.deleted
  }

  isUpdated(): boolean {
    return this.updated
  }
}
