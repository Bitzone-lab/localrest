import LocalRest from '../../src'

interface Data {
  name: string
  age: number
}

const list = [
  { id: 1, name: 'Juan', age: 15 },
  { id: 7, name: 'Mario', age: 18 }
]

enum MyHelper {
  MODE1,
  MODE2
}

describe('helper', function () {
  it('default', function () {
    const localrest: LocalRest<Data, MyHelper> = new LocalRest(list, MyHelper.MODE1)

    expect(localrest.helper(1)).toBe(MyHelper.MODE1)
    expect(localrest.helper(7)).toBe(MyHelper.MODE1)

    localrest.each(function (data, valid, helper) {
      expect(helper).toBe(MyHelper.MODE1)
    })
  })

  it('change', function () {
    const localrest: LocalRest<Data, MyHelper> = new LocalRest(list, MyHelper.MODE1)

    const helper = localrest.helper(1, MyHelper.MODE2)
    expect(helper).toBe(MyHelper.MODE2)

    const helpers = localrest.each(function (data, valid, helper) {
      return helper
    })

    expect(helpers).toEqual(expect.arrayContaining([MyHelper.MODE2, MyHelper.MODE1]))
  })

  it('reset', function () {
    const localrest: LocalRest<Data, MyHelper> = new LocalRest(list, MyHelper.MODE1)

    expect(localrest.helper(1, MyHelper.MODE2)).toBe(MyHelper.MODE2)
    expect(localrest.helper(7, MyHelper.MODE2)).toBe(MyHelper.MODE2)

    localrest.reset('helper')

    expect(localrest.helper(1)).toBe(MyHelper.MODE1)
    expect(localrest.helper(7)).toBe(MyHelper.MODE1)
  })
})
