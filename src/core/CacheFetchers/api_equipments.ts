import UnknownEquipmentError from '../../errors/UnknownEquipmentError';
import { defineProperty } from './defp';

/**
 * Map objects like Array.prototype.map() but its for objects
 * @param obj - The object
 * @param fn - Callback
 * @ignore
 */
const mapObject = (obj, fn) => Object.keys(obj).reduce((result, key) => {
  result[key] = fn(obj[key]);
  return result;
}, {});

export default class Equipments {
  public _cache
  constructor(cache) {
    defineProperty(this, '_cache', { value: cache, writable: false });
  }
  
  get raw() {
    if (!this._cache._api_equipments_raw) return null;
    return this._cache._api_equipments_raw;
  }
  
  get _fuze() {
    if (!this._cache._api_equipments) return null;
    return this._cache._api_equipments;
  }
  
  get data() {
    if (!this._fuze) return null;
    return this._fuze.list;
  }

  /**
   * Grabs a equiptment from database
   * @param id The equiptment's ID or name
   */
  async get(id: string) {
    const data = await this.raw;
    const keys = Object.keys(data);
    const map = Object.keys(mapObject(data, obj => obj.names));
    const filter1 = keys.filter(item => item.includes(id));
    const filter2 = map.filter(item => data[item] === id);
    if (filter1.length) return data[filter1[0]];
    if (filter2.length) return data[filter2[0]];

    throw new UnknownEquipmentError(id);
  }
}
