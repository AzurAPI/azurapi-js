import { defineProperty } from './defp';
export default class BarrageAll {
    public _cache
    constructor(cache) {
      defineProperty(this, '_cache', { value: cache, writable: false });
    }
    
    get raw() {
      if (!this._cache._api_barrages_raw) return null;
      return this._cache._api_barrages_raw;
    }
    
    get _fuze() {
      if (!this._cache._api_barrages) return null;
      return this._cache._api_barrages;
    }
    
    get data() {
      if (!this._fuze) return null;
      return this._fuze.list;
    }
}
