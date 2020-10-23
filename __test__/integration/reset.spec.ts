import LocalRest from '../../src'

interface Data {
  name: string
  age: number
}

const list = [
  { id: 1, name: 'Juan', age: 15 },
  { id: 7, name: 'Mario', age: 18 }
]

describe('Reset', function () {
  it('id', function () {
    const localrest: LocalRest<Data> = new LocalRest(list)
    localrest.update(1, {
      name: 'Giordano'
    })

    expect(localrest.hasChange(1, 'name')).toBeTruthy()

    expect(localrest.reset(1)).toBeTruthy()

    expect(localrest.hasChange(1, 'name')).toBeFalsy()
  })
})
