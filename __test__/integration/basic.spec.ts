import Localrest from '../../src'

describe('Localrest: Basic', () => {
  interface Data {
    id?: number
    name: string
  }
  const localrest: Localrest<Data, null> = new Localrest()
  let id: number | undefined

  it('create data', (done) => {
    const result = localrest.add({
      name: 'Juan'
    })

    expect(result).toMatchObject({
      id: expect.any(Number),
      name: 'Juan'
    })
    id = result.id
    done()
  })

  it('get data', (done) => {
    expect(typeof id).toBe('number')

    const data = localrest.get(id || 0)
    expect(data).toMatchObject({
      id,
      name: 'Juan'
    })
    done()
  })

  it('list data', (done) => {
    expect(localrest.list().length).toBe(1)
    expect(localrest.list()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id,
          name: 'Juan'
        })
      ])
    )
    done()
  })

  it('map data', (done) => {
    localrest.map((data, id) => {
      expect(data).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String)
      })
      expect(typeof id).toBe('number')
    })
    done()
  })

  // it('update data', (done) => {
  //   expect(typeof id).toBe('number')

  //   expect(
  //     localrest.update(id, {
  //       name: 'Miguel'
  //     })
  //   ).toBeTruthy()

  //   const data = localrest.get(id || 0)
  //   expect(data).toMatchObject({
  //     id,
  //     name: 'Miguel'
  //   })
  //   done()
  // })

  // it('delete data', () => {
  //   expect(typeof id).toBe('number')

  //   expect(localrest.delete(id)).toBeTruthy()
  //   expect(localrest.get(id)).toBeNull()
  //   expect(localrest.list().length).toBe(0)
  // })
})
