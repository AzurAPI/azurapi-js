import UnknownBarrageError from '../../errors/UnkonwnBarrageError';
import { defineProperty } from './defp';

export default class Barrage {
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

    /**
     * Grab barrage from database
     * @param id The barrages name/id
     */
    async getBarrage(id: string) {
      const data = await this.raw;
      let result = data.filter(obj => obj.id.includes(id));
      if (!result) throw new UnknownBarrageError(id);
      return result;
    }
}
