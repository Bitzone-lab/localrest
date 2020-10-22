import LocalData from '../data_types/LocalData'
import SystemData from '../data_types/SystemData'

export default class Store<T, K> {
  protected collections: Map<number, SystemData<T, K> | LocalData<T, K>> = new Map()
  protected defaultHelper?: K
}
