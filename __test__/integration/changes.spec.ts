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

describe('Changes', function () {
  it('has change this prop', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    const result = localrest.hasChange(1, 'name')
    expect(result).toBeFalsy()

    localrest.update(1, {
      name: 'Luis'
    })

    expect(localrest.get(1)?.name).toBe('Luis')
    const result2 = localrest.hasChange(1, 'name')
    expect(result2).toBeTruthy()
    const result3 = localrest.hasChange(1, 'age')
    expect(result3).toBeFalsy()
  })

  it('has change this data', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    const result = localrest.hasChange(1)
    expect(result).toBeFalsy()

    localrest.update(1, {
      name: 'Luis'
    })

    const result2 = localrest.hasChange(1)
    expect(result2).toBeTruthy()
    const result3 = localrest.hasChange(41)
    expect(result3).toBeFalsy()
  })

  it('has change all', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    const result = localrest.hasChange()
    expect(result).toBeFalsy()

    localrest.update(1, {
      name: 'Luis'
    })

    const result2 = localrest.hasChange()
    expect(result2).toBeTruthy()
    const result3 = localrest.hasChange(1)
    expect(result3).toBeTruthy()
  })

  it('clear has change', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.update(1, { name: 'Luis' })
    const result = localrest.hasChange()
    expect(result).toBeTruthy()
    expect(localrest.reset('list')).toBeTruthy()
    const result2 = localrest.hasChange()
    expect(result2).toBeFalsy()
  })
})
