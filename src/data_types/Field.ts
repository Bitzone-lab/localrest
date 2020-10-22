export default class Field<T> {
  private _value: T
  private backup: string

  constructor(value: T) {
    this._value = value
    this.backup = JSON.stringify(value)
  }

  hasChange(): boolean {
    if (this.backup === JSON.stringify(this._value)) {
      return true
    } else {
      return false
    }
  }

  update(value: T) {
    this._value = value
  }

  get value(): T {
    return this._value
  }
}
