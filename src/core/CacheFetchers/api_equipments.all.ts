import { defineProperty } from './defp';

export default class EquipmentsAll {
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
}
