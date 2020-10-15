import Localrest from '../../src'
import DataUsers, { DataUser } from '../fixtures/DataUsers'

describe('Localrest: SystemData', () => {
  const localrest: Localrest<DataUser, null> = new Localrest(DataUsers)

  it('expect result', () => {
    expect(localrest.delete(1)).toBeTruthy()
    expect(
      localrest.update(5, {
        age: 12
      })
    ).toBeTruthy()

    const user = localrest.get(5)
    expect(user).toMatchObject({
      id: 5,
      name: 'Miguel',
      age: 12
    })

    const result = localrest.result()

    expect(result.hasToDelete).toBeTruthy()
    expect(result.hasToUpdate).toBeTruthy()

    expect(result.toAdd().length).toBe(0)
    expect(result.toDelete().length).toBe(1)
    expect(result.toUpdate().length).toBe(1)

    expect(result.toDelete()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: 'Erick',
          age: 18
        })
      ])
    )

    expect(result.toUpdate()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 5,
          name: 'Miguel',
          age: 12
        })
      ])
    )
  })
})
