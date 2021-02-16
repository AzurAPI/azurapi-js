import UnknownShipError from '../../errors/UnknownShipError';
import { defineProperty } from './defp';

type shipLanguage =
    'english'
    | 'English'
    | 'ENGLISH'
    | 'en'
    | 'chinese'
    | 'Chinese'
    | 'CHINESE'
    | 'cn'
    | 'japanese'
    | 'Japanese'
    | 'JAPANESE'
    | 'jp'
    | 'korean'
    | 'Korean'
    | 'KOREAN'
    | 'kr'

interface shipAdvancedOptions {
  nameOnly?: boolean,
  idOnly?: boolean,
  language?: shipLanguage
}

/**
 * The ships functions class
 */
export default class Ships {
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
     * Search from all ships
     * @param id The ship's name in all languages or id
     * @param advanced Advanced options
     * @returns Object
     */
    async get(id: string, advanced: shipAdvancedOptions) {
      if (advanced) {
        let language;
        let idOnly = false;
        let nameOnly = false;
        if (advanced.idOnly) {
          idOnly = true;
        }
        if (advanced.nameOnly) {
          nameOnly = true;
        }
        if (advanced.language) {
          language = advanced.language;
        } else {
          language = undefined;
        }
        if (idOnly && nameOnly) {
          throw new Error('The idOnly and nameOnly option cannot be both true');
        }
        if (idOnly && language !== 'false') {
          throw new Error('The idOnly and language option cannot be both used');
        }
        if (idOnly) {
          return this.id(parseInt(id));
        }
        if (nameOnly || nameOnly && !language) {
          return this.name(id);
        }
        if (nameOnly && language) {
          return this.name(id, language);
        }

      } else {
        const data = this.raw;
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

    /**
     * Search by name from all ships
     * @param id The ship's name in all languages or one specific language
     * @param limit The limit to amount of responses (defaults to 10)
     * @param language A specific language to search by
     */
    async name(id: string, language?: shipLanguage, limit?: number,) {
      if (language) {
        const data = this.raw;
        if (!data) return null;
        let lang;
        switch (language) {
          case 'en' || 'English' || 'ENGLISH' || 'english':
            lang = data.names.en;
            break;
          case 'cn' || 'Chinese' || 'CHINESE' || 'chinese':
            lang = data.names.cn;
            break;
          case 'jp' || 'Japanese' || 'JAPANESE' || 'japanese':
            lang = data.names.jp;
            break;
          case 'kr' || 'Korean' || 'KOREAN' || 'korean':
            lang = data.names.kr;
            break;
        }
        const ships = lang.find(d => d.includes(id));
        return ships;
      } else {
        const data = this.data;
        if (!data) return null;
        const ships = data.search(id, limit ? limit : 10);
        if (!ships.length) return null;
        return ships;
      }
    }

    /**
     * Search by id from all ships
     * @param id The id of the ship
     */
    async id(id: number) {
      const data = this.raw;
      if (!data) return null;
      const ships = data.find(d => d.id === id);
      return ships;
    }
}
