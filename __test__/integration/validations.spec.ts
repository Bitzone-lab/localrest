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
    expect(result).toBeTruthy()

    const result2 = localrest.valid(2, 'name', 'required name')
    expect(result2).toBeFalsy()

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

    expect(result).toBeTruthy()

    const result2 = localrest.validation(7, {
      name: 'required name'
    })

    expect(result2).toBeFalsy()

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
