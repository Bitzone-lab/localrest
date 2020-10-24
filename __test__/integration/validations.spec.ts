import LocalRest from '../../src'

interface Data {
  id?: number
  name: string
  age: number
}

const list = [
  { id: 1, name: 'Juan', age: 15 },
  { name: 'Mario', age: 18 }
]

describe('Validations', function () {
  it('set valid', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    const result = localrest.valid(1, 'name', 'required name')
    expect(result).toBe('required name')

    const result2 = localrest.valid(2, 'name', 'required name')
    expect(result2).toBeNull()

    const validation = localrest.each(function (data, validation) {
      return validation
    })

    expect(validation).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'required name',
          age: ''
        }),
        expect.objectContaining({
          name: '',
          age: ''
        })
      ])
    )
  })

  it('set validation', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    const result = localrest.validation(1, {
      name: 'required name',
      age: 'its not number'
    })

    expect(result).toMatchObject({
      name: 'required name',
      age: 'its not number'
    })

    const result2 = localrest.validation(7, {
      name: 'required name'
    })

    expect(typeof result2).toBe('object')
    expect(result2).not.toHaveProperty('name')
    expect(result2).not.toHaveProperty('age')

    const validation = localrest.each(function (data, validation) {
      return validation
    })

    expect(validation).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'required name',
          age: 'its not number'
        }),
        expect.objectContaining({
          name: '',
          age: ''
        })
      ])
    )
  })

  it('get validations', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.validation(1, {
      name: 'required name',
      age: 'its not number'
    })

    expect(localrest.valid(1, 'name')).toBe('required name')
    expect(localrest.valid(1, 'age')).toBe('its not number')
    expect(localrest.valid(2, 'name')).toBeNull()
    expect(localrest.valid(2, 'age')).toBeNull()
    expect(localrest.validation(1)).toMatchObject({
      name: 'required name',
      age: 'its not number'
    })
    const validation = localrest.validation(2)
    expect(validation).not.toHaveProperty('name')
    expect(validation).not.toHaveProperty('age')
  })

  it('clear validations', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.validation(1, {
      name: 'required name',
      age: 'its not number'
    })

    expect(localrest.reset('validations')).toBeTruthy()

    const validation = localrest.each(function (data, validation) {
      return validation
    })

    expect(validation).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: '',
          age: ''
        }),
        expect.objectContaining({
          name: '',
          age: ''
        })
      ])
    )
  })
})
