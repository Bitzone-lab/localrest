import LocalRest from '../../src'

interface Data {
  id?: number
  name: string
  age: number
}

const list1 = [
  {
    id: 4,
    name: 'Juan',
    age: 15
  },
  {
    id: 7,
    name: 'Mario',
    age: 18
  }
]

const list2 = [
  {
    id: 9,
    name: 'Ana',
    age: 54
  },
  {
    id: 12,
    name: 'Juana',
    age: 9
  },
  {
    name: 'Jorge',
    age: 16
  }
]

const list3 = [
  {
    id: 4,
    name: 'Juan',
    age: 15
  }
]

enum MyHelper {
  MODE1,
  MODE2
}

describe('initial', function () {
  it('inits', function () {
    const localrest: LocalRest<Data> = new LocalRest()

    localrest.init(list1)
    expect(localrest.size).toBe(2)

    localrest.init(list2)
    expect(localrest.size).toBe(3)

    localrest.init()
    expect(localrest.size).toBe(0)
  })

  it('update init', function () {
    const localrest: LocalRest<Data> = new LocalRest(list3)

    localrest.add({
      name: 'Mirian',
      age: 23
    })

    const result = localrest.result()
    expect(result.hasToAdd).toBeTruthy()
    const data = result.toAdd()[0]

    localrest.init([...list3, { ...data, id: 89 }])

    expect(localrest.result().hasToAdd).toBeFalsy()
    expect(localrest.size).toBe(2)
  })

  it('init helper', function () {
    const localrest: LocalRest<Data, MyHelper> = new LocalRest(list3, MyHelper.MODE1)

    localrest.init(list1, MyHelper.MODE2)

    const helpers = localrest.each(function (data, valid, helper) {
      return helper
    })

    expect(helpers).toEqual(expect.arrayContaining([MyHelper.MODE2, MyHelper.MODE2]))
  })
})
