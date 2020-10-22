import DataBase from './DataBase'

export default class LocalData<T, K> extends DataBase<T, K> {
  constructor(body: T, helper?: K) {
    super(body, helper)
  }

  update(body: any) {
    if (typeof body === 'object') {
      this.value = {
        ...this.value,
        ...body
      }
    } else {
      this.value = body
    }
  }
}
