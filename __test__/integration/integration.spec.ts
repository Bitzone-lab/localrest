import Localrest from '../../src/'

describe('Localrest', () => {
  interface Data {
    name: string
    age: number
    id?: number
  }

  enum Mode {
    ADD,
    EDIT
  }

  const data: Array<Data> = [
    {
      name: 'Erick',
      age: 18
    }
  ]

  const localrest = new Localrest(data, Mode.ADD)
  localrest.add(
    {
      name: 'afasfa',
      age: 18
    },
    Mode.EDIT
  )
  localrest.update(1, {
    name: 'asf'
  })
})
