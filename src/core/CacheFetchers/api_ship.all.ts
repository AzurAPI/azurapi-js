import { defineProperty } from './defp';
type shipLanguage = 'english' | 'English' | 'ENGLISH' | 'en' | 'chinese' | 'Chinese' | 'CHINESE' | 'cn' | 'japanese' | 'Japanese' | 'JAPANESE' | 'jp' | 'korean' | 'Korean' | 'KOREAN' | 'kr';
type shipRarity = 'common' | 'Common' | 'rare' | 'Rare' | 'elite' | 'Elite' | 'super rare' | 'Super Rare';
type shipHullType = /*'DD' | 'CL' | 'CA' | 'CB' | 'BB' | 'BC' | 'BM' | 'BBV' | 'CV' | 'CVL' | 'AR' | 'SS' | 'SSV' |*/ 'Destroyer' | 'Light Cruiser' | 'Heavy Cruiser' | ' Large Cruiser' | 'Battleship' | 'Battlecruiser' | 'Monitor' | 'Aviation Battleship' | 'Fleet Aircraft Carrier' | 'Light Aircraft Carrier' | 'Repair Ship' | 'Submarine' | 'Submarine Seaplane Carrier' 
type Nationality = 'USS' | 'Eagle Union' | 'HMS' | 'Royal Navy' | 'IJN' | 'Sakura Empire'
  | 'KMS' | 'Iron Blood' | 'ROC' | 'Eastern Radiance' | 'SN' | 'North Union' | 'FNFF' | 'Iris Libre'
  | 'MNF' | 'Vichya Domination' | 'RN' | 'Sardenga Empire' | 'HDN' | 'Neptunia' | 'Bilibili' | 'Utawarerumono'
  | 'KizunaAI' | 'Hololive';

const Nationalities: {
  [x in Exclude<Nationality, 'USS' | 'HMS' | 'IJN' | 'KMS' | 'ROC' | 'SN' | 'FNFF' | 'MNF' | 'RN' | 'HDN'>]: string[]
} = {
  'Eagle Union': ['USS', 'Eagle Union'],
  'Royal Navy': ['HMS', 'Royal Navy'],
  'Sakura Empire': ['IJN', 'Sakura Empire'],
  'Iron Blood': ['KMS', 'Iron Blood'],
  'Eastern Radiance': ['ROC', 'Eastern Radiance'],
  'North Union': ['SN', 'North Union'],
  'Iris Libre': ['FFNF', 'Iris Libre'],
  'Vichya Domination': ['MNF', 'Vichya Domination'],
  'Sardenga Empire': ['RN', 'Sardegna Empire'],
  Neptunia: ['HDN', 'Neptunia'],
  Bilibili: ['Bilibili'],
  Utawarerumono: ['Utawarerumono'],
  KizunaAI: ['KizunaAI'],
  Hololive: ['Hololive']
};

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
   * Filter ship by name language
   * @param language A language to filter by
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
    }
    return lang;
  }

  /**
   * Filter ship by nationality
   * @param nationality A nationality to filter by
   */
  async nationality(nationality: Nationality) {
    const data = this.raw;
    if (!data) return null;
    const ships = data.filter(ship => {
      if (!Nationalities.hasOwnProperty(ship.nationality)) return false;

      const nationalities = Nationalities[ship.nationality];
      return nationalities.includes(nationality);
    });
    return ships;
  }

  /**
   * Filter ship by rarity
   * @param rarity A rarity to filter by
   */
  async rarity(rarity: shipRarity) {
    const data = this.raw;
    if (!data) return null;
    let r;
    switch(rarity) {
      case 'common' || 'Common':
        r = 'Common';
        break;
      case 'rare' || 'Rare':
        r = 'Rare';
        break;
      case 'elite' || 'Elite':
        r = 'Elite';
        break;
      case 'super rare' || 'Super Rare':
        r = 'Super Rare';
        break;
    }
    const ships = data.filter(d => d.rarity === r);
    return ships;
  }

  /**
   * Filter ship by hull type
   * @param type A hull type to filter by
   */
  async type(type: shipHullType) {
    const data = this.raw;
    if (!data) return null;
    const ships = data.filter(d => d.hullType === type);
    return ships;
  }

  /**
   * Filter ship by class
   * @param shipclass A ship class to filter by
   */
  async class(shipclass: string) {
    const data = this.raw;
    if (!data) return null;
    const ships = data.filter(d => d.class === shipclass);
    return ships;
  }
}
