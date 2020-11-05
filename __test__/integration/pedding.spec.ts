import LocalRest from '../../src'

interface Data {
  id?: number
  name: string
  age: number
}

const list = [
  { id: 1, name: 'Juan', age: 15 },
  { id: 2, name: 'Mario', age: 18 }
]

describe('Pedding', function () {
  it('added data pendding', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.add(
      {
        name: 'Raul',
        age: 13
      },
      true
    )

    const result = localrest.result()
    expect(result.hasToAdd).toBeFalsy()
    expect(result.toAdd().length).toBe(0)
  })

  it('update data pendding', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.update(
      1,
      {
        name: 'Raul',
        age: 13
      },
      true
    )

    const result = localrest.result()
    expect(result.hasToUpdate).toBeFalsy()
    expect(result.toUpdate().length).toBe(0)
  })

  it('delete data pendding', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.delete(1, true)

    const result = localrest.result()
    expect(result.hasToDelete).toBeFalsy()
    expect(result.toDelete().length).toBe(0)
  })

  it('added data pendding accept', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.add(
      {
        name: 'Raul',
        age: 13
      },
      true
    )
    expect(localrest.accept()).toBeTruthy()
    const result = localrest.result()
    expect(result.hasToAdd).toBeTruthy()
    expect(result.toAdd().length).toBe(1)
    expect(result.toAdd()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Raul',
          age: 13
        })
      ])
    )
    expect(localrest.accept()).toBeFalsy()
  })

  it('update data pendding accept', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.update(
      1,
      {
        name: 'Raul',
        age: 13
      },
      true
    )
    expect(localrest.accept()).toBeTruthy()

    const result = localrest.result()
    expect(result.hasToUpdate).toBeTruthy()
    expect(result.toUpdate().length).toBe(1)
    expect(result.toUpdate()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Raul',
          age: 13
        })
      ])
    )
    expect(localrest.accept()).toBeFalsy()
  })

  it('delete data pendding accept', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.delete(1, true)
    expect(localrest.accept()).toBeTruthy()

    const result = localrest.result()
    expect(result.hasToDelete).toBeTruthy()
    expect(result.toDelete().length).toBe(1)

    expect(localrest.accept()).toBeFalsy()
  })

  it('mapping penddings accept', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.delete(1, true)
    localrest.update(
      2,
      {
        name: 'Ana',
        age: 11
      },
      true
    )
    localrest.add(
      {
        name: 'Liliana',
        age: 55
      },
      true
    )

    const result1 = localrest.result()
    expect(result1.all().length).toBe(2)

    const list_data_not_accepted = result1.mapping(function (data, to) {
      return data
    })

    expect(list_data_not_accepted.length).toBe(2)
    expect(list_data_not_accepted).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: 'Juan',
          age: 15
        }),
        expect.objectContaining({
          id: 2,
          name: 'Mario',
          age: 18
        })
      ])
    )

    expect(localrest.accept()).toBeTruthy()
    const list_data_accepted = result1.mapping(function (data, to) {
      return data
    })
    expect(list_data_accepted.length).toBe(3)
    expect(list_data_accepted).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: 'Juan',
          age: 15
        }),
        expect.objectContaining({
          id: 2,
          name: 'Ana',
          age: 11
        }),
        expect.objectContaining({
          name: 'Liliana',
          age: 55
        })
      ])
    )
  })

  it('pedding cancel', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.delete(1, true)
    localrest.update(
      2,
      {
        name: 'Ana',
        age: 11
      },
      true
    )
    const data_created1 = localrest.add(
      {
        name: 'Liliana',
        age: 55
      },
      true
    )
    const data_created2 = localrest.add(
      {
        name: 'Cynthia',
        age: 25
      },
      true
    )
    expect(localrest.size).toBe(3)
    expect(localrest.get(1)).toBeNull()
    expect(localrest.get(2)).toMatchObject({
      id: 2,
      name: 'Ana',
      age: 11
    })
    expect(localrest.get(data_created1.id)).toMatchObject({
      id: data_created1.id,
      name: 'Liliana',
      age: 55
    })
    expect(localrest.get(data_created2.id)).toMatchObject({
      id: data_created2.id,
      name: 'Cynthia',
      age: 25
    })

    localrest.cancel()
    expect(localrest.size).toBe(2)
    expect(localrest.get(1)).toMatchObject({
      id: 1,
      name: 'Juan',
      age: 15
    })
    expect(localrest.get(2)).toMatchObject({
      id: 2,
      name: 'Mario',
      age: 18
    })
    expect(localrest.get(data_created1.id)).toBeNull()
    expect(localrest.get(data_created2.id)).toBeNull()
    expect(localrest.hasChange()).toBeFalsy()
    expect(localrest.accept()).toBeFalsy()
  })

  it('pedding accept and accept', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.add(
      {
        name: 'Raul',
        age: 13
      },
      true
    )
    localrest.accept()
    const result1 = localrest.result()
    expect(result1.hasToAdd).toBeTruthy()
    expect(result1.toAdd().length).toBe(1)
    localrest.add(
      {
        name: 'David',
        age: 33
      },
      true
    )
    localrest.accept()
    const result2 = localrest.result()
    expect(result2.hasToAdd).toBeTruthy()
    expect(result2.toAdd().length).toBe(2)
  })

  it('pedding accept and cancel by id', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.update(1, { name: 'Suarez', age: 4 }, true)
    localrest.update(2, { name: 'Jordi', age: 1 }, true)

    expect(localrest.accept(1)).toBeTruthy()
    expect(localrest.accept(1)).toBeFalsy()
    const result = localrest.result()
    expect(result.toUpdate().length).toBe(1)

    expect(localrest.cancel(2)).toBeTruthy()
    expect(localrest.cancel(2)).toBeFalsy()
    expect(localrest.get(2)).toMatchObject({ id: 2, name: 'Mario', age: 18 })
    expect(localrest.hasChange()).toBeTruthy()
  })
})
