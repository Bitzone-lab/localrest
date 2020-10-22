import LocalRest from '../../src'
interface Data {
  id?: number
  name: string
  age: number
}

const list = [
  {
    name: 'Juan',
    age: 15
  },
  {
    name: 'Mario',
    age: 18
  }
]

describe('Local Data', () => {
  it('set list data by instance and expect list method', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    expect(localrest.list()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Juan',
          age: 15
        }),
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Mario',
          age: 18
        })
      ])
    )

    expect(localrest.size).toBe(2)
  })

  it('create data', function () {
    const localrest: LocalRest<Data, null> = new LocalRest()
    const result = localrest.add(list[0])

    expect(result).toMatchObject({
      id: expect.any(Number),
      name: 'Juan',
      age: 15
    })

    const result2 = localrest.add(list[1])

    expect(result2).toMatchObject({
      id: expect.any(Number),
      name: 'Mario',
      age: 18
    })

    expect(localrest.size).toBe(2)
  })

  it('update data', function () {
    const localrest: LocalRest<Data> = new LocalRest()
    const data = localrest.add(list[0])

    const result = localrest.update(data.id, {
      name: 'Ana',
      age: 25
    })

    expect(result).toBeTruthy()

    expect(localrest.get(data.id)).toMatchObject({
      id: expect.any(Number),
      name: 'Ana',
      age: 25
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

    expect(ids).toEqual(expect.arrayContaining([expect.any(Number), expect.any(Number)]))
  })
})
