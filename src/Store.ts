import LocalData from './DataManagement/LocalData'
import LocalrestResult from './DataManagement/LocalrestResult'
import SystemData from './DataManagement/SystemData'
import TypeID from './enums/TypeID'
import { IDNumber, IDString } from './generator'
import DataListExtendsInterface from './interfaces/DataListExtendsInterface'

export default class Store<T extends DataListExtendsInterface, K> {
  private typeID: TypeID = TypeID.NUMBER

  protected dataMap: Map<string | number, SystemData<T, K> | LocalData<T, K>> = new Map()
  protected defaultMode?: K

  protected generateID(): string | number {
    return this.typeID === TypeID.STRING ? IDString() : IDNumber()
  }

  constructor(dataList: Array<T>, defaultMode?: K, typeId: TypeID = TypeID.NUMBER) {
    this.typeID = typeId
    this.init(dataList, defaultMode)
  }

  init(dataList: Array<T> = [], defaultMode?: K) {
    this.defaultMode = defaultMode

    dataList.map((data) => {
      const ID = this.generateID()
      const id = data.id || ID

      if (data.id) {
        const dataSystem: SystemData<T, K> = new SystemData(data, defaultMode)
        this.dataMap.set(id, dataSystem)
      } else {
        const locaData: LocalData<T, K> = new LocalData(data, defaultMode)
        this.dataMap.set(id, locaData)
      }
    })
  }

  result(): LocalrestResult<T, K> {
    return new LocalrestResult(this.dataMap)
  }
}
