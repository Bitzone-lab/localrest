import { generator } from '../../src/utils'

describe('generator', function () {
  it('get id', function () {
    const _ = generator()
    const id1 = _.getID()
    expect(id1).toEqual(expect.any(Number))
    const id2 = _.getID()

    expect(id2).toBeGreaterThan(id1)
  })

  it('generate ids for for', function () {
    const _ = generator()
    const ids: Array<number> = []
    for (let index = 0; index < 3; index++) {
      ids.push(_.getID())
    }
    expect(ids[2]).toBeGreaterThan(ids[1])
    expect(ids[1]).toBeGreaterThan(ids[0])
  })
})
