export default class Data<T, K> {
  private data: T
  private id: null | number = null
  private helper?: K

  constructor(id: number | null, data: T, helper?: K) {
    this.id = id
    this.data = data
    this.helper = helper
  }

  hasId(): boolean {
    return !!this.id
  }

  get() {
    return {
      data: this.data,
      helper: this.helper,
      id: this.id
    }
  }
}
