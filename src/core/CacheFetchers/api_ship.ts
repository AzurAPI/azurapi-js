import UnknownShipError from '../../errors/UnknownShipError';
import { defineProperty } from './defp';
export default class Ships {
  public _cache
  constructor(cache) {
    defineProperty(this, '_cache', { value: cache, writable: false });
  }

  get raw() {
    if (!this._cache._api_ship_raw) return null;
    return this._cache._api_ship_raw;
  }

  get _fuze() {
    if (!this._cache._api_ship) return null;
    return this._cache._api_ship;
  }

  get data() {
    if (!this._fuze) return null;
    return this._fuze.list;
  }

  async get(id: string) {
    const data = this.data;
    if (!data) return null;
    const ships = data.filter(ship => {
      if (ship.id === id) return true;
      for (const key of Object.keys(ship.names)) {
        if (ship.names[key].includes(id)) return true;
      }
      return false;
    });

    if (!ships.length) throw new UnknownShipError(id);
    return ships[0];
  }
}
