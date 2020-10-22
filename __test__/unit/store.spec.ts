import Store from '../../src/core/Store'

describe('Store', function () {
  it('instance', function () {
    class Test<T, K> extends Store<T, K> {
      constructor() {
        super()
        expect(this.collections).toBeInstanceOf(Map)
        expect(this.defaultHelper).toBeUndefined()
      }
    }

    new Test()
  })
})
