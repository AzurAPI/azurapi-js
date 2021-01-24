// THE SPECS CHANGED AGAIN LMFAO
import { defineProperty } from './defp';

type shipHullType = /*'DD' | 'CL' | 'CA' | 'CB' | 'BB' | 'BC' | 'BM' | 'BBV' | 'CV' | 'CVL' | 'AR' | 'SS' | 'SSV' |*/ 'Destroyer' | 'Light Cruiser' | 'Heavy Cruiser' | ' Large Cruiser' | 'Battleship' | 'Battlecruiser' | 'Monitor' | 'Aviation Battleship' | 'Fleet Aircraft Carrier' | 'Light Aircraft Carrier' | 'Repair Ship' | 'Submarine' | 'Submarine Seaplane Carrier'
type shipRarity = 'common' | 'Common' | 'rare' | 'Rare' | 'elite' | 'Elite' | 'super rare' | 'Super Rare';
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
export default class ShipsFilter {
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
   * Filter ship by faction
   * (Alias of <AzurAPI>.cache.ship.filter.nationality())
   * @param faction A faction to filter by
   */
  async faction(faction: any) {
    const data = this.raw;
    if (!data) return null;
    const ships = data.filter(ship => {
      if (!Nationalities.hasOwnProperty(ship.nationality)) return false;

      const nationalities = Nationalities[ship.nationality];
      return nationalities.includes(faction);
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
