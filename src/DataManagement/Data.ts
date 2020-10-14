export default class Data<T, K> {
  protected value: T
  mode?: K

  constructor(value: T, mode?: K) {
    this.value = value
    this.mode = mode
  }

  get(): T {
    return this.value
  }

  changeMode(mode: K): boolean {
    if (mode === this.mode) return false
    this.mode = mode
    return true
  }

  isMode(mode: K): boolean {
    if (this.mode === mode) return true
    return false
  }
}
