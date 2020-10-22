import DataBase from './DataBase'

export default class LocalData<T, K> extends DataBase<T, K> {
  constructor(body: T, helper?: K) {
    super(body, helper)
  }

  update(body: Partial<Record<keyof T, any>>) {
    this.value = {
      ...this.get(),
      ...body
    }
    for (const key in body) {
      this.fields[key].update(body[key])
    }
  }
}
