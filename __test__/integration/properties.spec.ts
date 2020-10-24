import LocalRest from '../../src'

interface Data {
  id?: number
  name: string
  age: number
  lastname?: string
  phone?: number
}

const list: Array<Data> = [
  { id: 1, name: 'Juan', age: 15 },
  { id: 2, name: 'Mario', age: 18 },
  { name: 'Miguel', age: 19, lastname: 'Ramos' },
  { name: 'Ana', age: 19, lastname: 'Huami', phone: 98 }
]

describe('Properties', () => {
  it('Update of a data that does not have x property initialized', function () {
    const localRest = new LocalRest(list)

    const result = localRest.update(1, {
      lastname: 'Pulido'
    })
    expect(result).toBeTruthy()
    const data = localRest.add({
      name: 'Manuel',
      age: 77
    })
    const result2 = localRest.update(data.id, {
      lastname: 'Rimez'
    })
    expect(result2).toBeTruthy()
  })

  it('Update of the data id but not the initialized one', function () {
    const localRest = new LocalRest(list)
    const result = localRest.update(2, {
      id: 198
    })

    expect(result).toBeTruthy()
    expect(localRest.get(2)?.id).toBe(2)
  })

  it('Creation of a data with id but that does not replace the generated id', function () {
    const localRest = new LocalRest(list)
    const result = localRest.add({
      id: 6,
      name: 'Juan',
      age: 87
    })

    expect(result.id).not.toEqual(6)
    expect(localRest.get(result.id)).not.toBeNull()
  })

  it('Get validation for non-existent property', function () {
    const localRest = new LocalRest(list)
    expect(localRest.valid(1, 'lastname')).toBeNull()
  })

  it('has change for non-existent property', function () {
    const localRest = new LocalRest(list)
    expect(localRest.hasChange(2, 'phone')).toBeFalsy()
    localRest.update(2, {
      phone: 15
    })
    expect(localRest.hasChange(2, 'phone')).toBeTruthy()

    const data = localRest.add({
      name: 'Cinthia',
      age: 55
    })
    localRest.update(data.id, {
      phone: 7879811651
    })

    expect(localRest.hasChange(data.id, 'phone')).toBeTruthy()
  })
})
