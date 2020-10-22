import Field from './Field'

interface Fields<T> {
  [key: string]: T
}

export default class DataBase<T, K> {
  protected value: T
  helper_value?: K
  validations: Partial<Record<keyof T, string>> = {}
  fields: Fields<Field<any>> = {}

  constructor(values: T, helper?: K) {
    this.value = values
    this.helper_value = helper
    for (const key in values) {
      this.validations[key] = ''
      const field: Field<T[Extract<keyof T, string>]> = new Field(values[key])
      this.fields[key] = field
    }
  }

  get(): T {
    return this.value
  }

  /**
   * Update and return helper, update is optional
   * @param helper Helper
   */
  helper(helper?: K): K | undefined {
    if (helper !== undefined) {
      this.helper_value = helper
    }
    return this.helper_value
  }

  valid<L extends keyof T>(field: L, message: string) {
    this.validations[field] = message
  }

  restartValidation() {
    for (const key in this.validations) {
      this.validations[key] = ''
    }
  }

  hasChange<L extends keyof T>(fieldname?: L): boolean {
    let changes = false
    if (fieldname === undefined) {
      for (const key in this.fields) {
        if (changes) break
        changes = this.fields[key].hasChange()
      }
    } else {
      changes = this.fields[fieldname as string].hasChange()
    }
    return changes
  }
}
