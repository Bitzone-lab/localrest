export default class DataFrezze<T> {
  private data_string: string = ''
  readonly type: 'added' | 'updated' | 'deleted'
  private changeBefore: boolean = false

  constructor(data: T, type: 'added' | 'updated' | 'deleted', hasChange: boolean = false) {
    this.data_string = JSON.stringify(data)
    this.type = type
    this.changeBefore = hasChange
  }

  get(): T {
    Object.freeze
    return JSON.parse(this.data_string)
  }

  hadChangeBefore() {
    return this.changeBefore
  }
}
