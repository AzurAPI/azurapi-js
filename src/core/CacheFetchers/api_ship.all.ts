import { defineProperty } from './defp';
type shipLanguage = 'english' | 'English' | 'ENGLISH' | 'en' | 'chinese' | 'Chinese' | 'CHINESE' | 'cn' | 'japanese' | 'Japanese' | 'JAPANESE' | 'jp' | 'korean' | 'Korean' | 'KOREAN' | 'kr' | 'code' | 'Code' | 'CODE';

/**
 * The ships.all functions class
 */
export default class ShipsAll {
  public _cache
  constructor(cache) {
    defineProperty(this, '_cache', { value: cache, writable: false });
  }

  /**
   * (Internal) Get raw data
   */
  get raw() {
    if (!this._cache._api_ship_raw) return null;
    return this._cache._api_ship_raw;
  }

  /**
   * (Internal) Get fuze data from cache
   */
  get _fuze() {
    if (!this._cache._api_ship) return null;
    return this._cache._api_ship;
  }

  /**
   * (Internal) Get fuze list
   */
  get data() {
    if (!this._fuze) return null;
    return this._fuze.list;
  }

  /**
   * Get the whole JSON file
   */
  async get() {
    if (this.raw) return this.raw;
    return null;
  }

  /**
   * Sort ship by name language
   * @param language A language to sort by
   */
  async name(language: shipLanguage) {
    const data = this.raw;
    if (!data) return null;
    let lang;
    switch(language) {
      case 'en' || 'English' || 'ENGLISH' || 'english':
        lang = data.names.en;
        break;
      case 'cn' || 'Chinese' || 'CHINESE' || 'chinese':
        lang = data.names.cn;
        break;
      case 'jp' || 'Japanese' || 'JAPANESE' ||'japanese':
        lang = data.names.jp;
        break;
      case 'kr' || 'Korean' || 'KOREAN' || 'korean':
        lang = data.names.kr;
        break;
      case 'code' || 'Code' || 'CODE':
        lang = data.names.code;
    }
    return lang;
  }

  /**
   * Sort ship by id
   */
  async id() {
    const data = this.raw;
    if (!data) return null;
    return data.id;
  }
}
