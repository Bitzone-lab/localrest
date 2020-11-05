import DataBase from './DataBase'
import Field from './Field'

export default class LocalData<T, K> extends DataBase<T, K> {
  initialized = false
  constructor(body: T, helper?: K) {
    super({ ...body }, helper)
  }

  update(body: Partial<Record<keyof T, any>>) {
    this.value = {
      ...this.get(),
      ...body
    }
    for (const key in body) {
      if (this.fields[key] === undefined) {
        const field = new Field(body[key])
        field.setBackup(undefined)
        this.fields[key] = field
      }
      this.fields[key].update(body[key])
    }
  }
}
