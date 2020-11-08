import LocalRest from '../../src'

interface Data {
  name: string
  age: number
}

const list = [
  { id: 1, name: 'Juan', age: 15 },
  { id: 7, name: 'Mario', age: 18 },
  { id: 17, name: 'Luisa', age: 44 }
]

describe('Results', function () {
  it('to update', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.update(1, { name: 'Manuel' })

    const result = localrest.result()
    expect(result.hasToUpdate).toBeTruthy()
    const data = result.toUpdate()[0]
    expect(data).toMatchObject({
      id: 1,
      name: 'Manuel',
      age: 15
    })
    expect(result.hasToDelete).toBeFalsy()
  })

  it('to delete', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.delete(1)

    const result = localrest.result()
    expect(result.hasToDelete).toBeTruthy()
    const data = result.toDelete()[0]
    expect(data).toMatchObject({
      id: 1,
      name: 'Juan',
      age: 15
    })
    expect(result.hasToUpdate).toBeFalsy()
  })

  it('to add', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.add({
      name: 'Antonio',
      age: 87
    })
    const result = localrest.result()
    expect(result.hasToAdd).toBeTruthy()

    const data = result.toAdd()[0]

    expect(data).toMatchObject({
      name: 'Antonio',
      age: 87
    })

    expect(result.hasToUpdate).toBeFalsy()
    expect(result.hasToDelete).toBeFalsy()
  })

  it('to all', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.add({
      name: 'Antonio',
      age: 87
    })
    localrest.update(7, {
      name: 'Miguel'
    })
    localrest.delete(1)
    const result = localrest.result()

    expect(result.hasToUpdate).toBeTruthy()
    expect(result.hasToDelete).toBeTruthy()
    expect(result.hasToAdd).toBeTruthy()

    const list_to_update = result.toUpdate()
    const list_to_delete = result.toDelete()
    const list_to_add = result.toAdd()

    expect(list_to_update).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 7,
          name: 'Miguel',
          age: 18
        })
      ])
    )

    expect(list_to_delete).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: 'Juan',
          age: 15
        })
      ])
    )

    expect(list_to_add).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Antonio',
          age: 87
        })
      ])
    )

    const all = result.all()
    expect(all.length).toBe(4)
  })

  it('mapping', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.add({
      name: 'Antonio',
      age: 87
    })
    localrest.add({
      name: 'Marcos',
      age: 55
    })
    localrest.update(7, {
      name: 'Miguel'
    })
    localrest.delete(1)
    const result = localrest.result()
    let added = 0
    let updated = 0
    let deleted = 0
    let nothing = 0
    const mapping = result.mapping(function (data, to) {
      if (to === 'added') added++
      if (to === 'updated') updated++
      if (to === 'deleted') deleted++
      if (to === 'nothing') nothing++
      return data
    })

    expect(mapping.length).toBe(5)
    expect(added).toBe(2)
    expect(updated).toBe(1)
    expect(deleted).toBe(1)
    expect(nothing).toBe(1)
  })

  it('filter with mapping', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.delete(1)
    const result = localrest.result()
    const data_filtered = result.mapping(function (data, to) {
      if (to === 'deleted') return
      return data
    })

    expect(data_filtered.length).toBe(2)
    expect(data_filtered).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 7, name: 'Mario', age: 18 }),
        expect.objectContaining({ id: 17, name: 'Luisa', age: 44 })
      ])
    )
  })
})
