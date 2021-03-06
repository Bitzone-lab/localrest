import LocalRest from '../../src'

interface Data {
  id?: number
  name: string
  age: number
}

const list = [
  { id: 1, name: 'Juan', age: 15 },
  { id: 5, name: 'Mario', age: 18 }
]

describe('System Data', function () {
  it('set list data by instance and expect list method', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)

    expect(localrest.list()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: 'Juan',
          age: 15
        }),
        expect.objectContaining({
          id: 5,
          name: 'Mario',
          age: 18
        })
      ])
    )

    expect(localrest.size).toBe(2)
  })

  it('set data', function () {
    const localrest: LocalRest<Data> = new LocalRest()
    const result = localrest.set(10, {
      name: 'Ana',
      age: 74
    })

    expect(result).toMatchObject({
      id: 10,
      name: 'Ana',
      age: 74
    })

    expect(localrest.size).toBe(1)
  })

  it('create data with system data', function () {
    const localrest: LocalRest<Data, null> = new LocalRest(list)
    const result = localrest.add({
      name: 'Mili',
      age: 41
    })

    expect(result).toMatchObject({
      id: expect.any(Number),
      name: 'Mili',
      age: 41
    })

    expect(localrest.size).toBe(3)
  })

  it('update data', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)

    const result = localrest.update(list[0].id, {
      name: 'Luis',
      age: 21
    })

    expect(result).toBeTruthy()

    expect(localrest.get(list[0].id)).toMatchObject({
      id: list[0].id,
      name: 'Luis',
      age: 21
    })
  })

  it('delete data', () => {
    const localrest: LocalRest<Data> = new LocalRest(list)
    const data_list = localrest.list()
    const result = localrest.delete(data_list[0].id)
    expect(result).toBeTruthy()
    expect(localrest.size).toBe(1)
  })

  it('mapping list data', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    const ids = localrest.each(function (data) {
      expect(data).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        age: expect.any(Number)
      })

      return data.id
    })

    expect(ids).toEqual(expect.arrayContaining([1, 5]))
  })
})
