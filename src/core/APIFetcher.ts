// APIFetcher.ts
/**
 * Functions to get data from github hosted JSON files
 * @packageDocumentation
 */

import UnserialisedError from '../errors/UnserialisableError';
import UnknownShipError from '../errors/UnknownShipError';
import UnknownEquipmentError from '../errors/UnknownEquipmentError';
import UnkonwnShipVoicelinesError from '../errors/UnknownShipVoicelinesError';
import UnknownBarrageError from '../errors/UnkonwnBarrageError';
import UnknownChapterError from '../errors/UnknownChapterError'; 
import { HttpClient } from '@augu/orchid';
import CacheService from './CacheService';

export type Nationality = 'USS' | 'Eagle Union' | 'HMS' | 'Royal Navy' | 'IJN' | 'Sakura Empire'
  | 'KMS' | 'Iron Blood' | 'ROC' | 'Eastern Radiance' | 'SN' | 'North Union' | 'FNFF' | 'Iris Libre'
  | 'MNF' | 'Vichya Domination' | 'RN' | 'Sardenga Empire' | 'HDN' | 'Neptunia' | 'Bilibili' | 'Utawarerumono'
  | 'KizunaAI' | 'Hololive';

//Nationalities
export const Nationalities: {
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
 * Map objects like Array.prototype.map() but its for objects
 * @param obj - The object
 * @param fn - Callback
 * @ignore
 */
const mapObject = (obj, fn) => Object.keys(obj).reduce((result, key) => {
  result[key] = fn(obj[key]);
  return result;
}, {});

/**
 * Fetcher to grab anything from the database on GitHub
 */
export default class APIFetcher {
  /**
   * The client to use to request
   */
  private http: HttpClient;

  /**
   * The client to use to cache data
   */
  private cache: CacheService;

  /**
   * Creates a new [APIFetcher] instance
   */
  constructor() {
    this.http = new HttpClient({
      defaults: {
        baseUrl: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master',
        headers: {
          'Accept': 'application/json'
        }
      }
    });
    this.cache = new CacheService(7 * 24 * 60 *1);
  }
  /**
   * Fetches all the ships from cache
   */
  async getDataShips() {
    return this.cache.get('ships', this.getRawShips());
  }

  /**
   * Fetches all the equipments from cache
   */
  async getDataEquipments() {
    return this.cache.get('equipments', this.getRawEquipments());
  }

  /**
   * Fetches all the chapters from cache
   */
  async getDataChapters() {
    return this.cache.get('chapters', this.getRawChapters());
  }

  /**
   * Fetches all the barrages from cache
   */
  async getDataBarrage() {
    return this.cache.get('barrage', this.getRawBarrage());
  }

  /**
   * Fetches all the voice lines from cache
   */
  async getDataVoicelines() {
    return this.cache.get('voicelines', this.getRawVoicelines());
  }

  /**
   * Fetches all the ships
   */
  async getRawShips() {
    const res = await this.http.get('/ships.json');
    let data: any[] = [];

    try {
      data = res.json();
    } catch(ex) {
      throw new UnserialisedError();
    }

    return data;
  }

  /**
   * Fetches all the equipments
   */
  async getRawEquipments() {
    const res = await this.http.get('/equipments.json');
    let data: any[] = [];

    try {
      data = res.json();
    } catch(ex) {
      throw new UnserialisedError();
    }

    return data;
  }

  /**
   * Fetches all the chapters
   */
  async getRawChapters() {
    const res = await this.http.get('/chapters.json');
    let data: any[] = [];

    try {
      data = res.json();
    } catch(ex) {
      throw new UnserialisedError();
    }

    return data;
  }

  /**
   * Fetches all the barrages
   */
  async getRawBarrage() {
    const res = await this.http.get('/barrage.json');
    let data: any[] = [];

    try {
      data = res.json();
    } catch(ex) {
      throw new UnserialisedError();
    }

    return data;
  }

  /**
   * Fetches all the voice lines
   */
  async getRawVoicelines() {
    const res = await this.http.get('/voice_lines.json');
    let data: any[] = [];

    try {
      data = res.json();
    } catch(ex) {
      throw new UnserialisedError();
    }

    return data;
  }

  /**
   * Grabs a ship from the database
   * @param id The ship's ID or name
   */
  async getShip(id: string) {
    const data = await this.getDataShips();
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

  /**
   * Grabs a ship from the database by it's faction name
   * @param faction The faction to get from
   */
  async getShipsFromFaction(faction: Nationality) {
    const data = await this.getDataShips();
    const query = data.filter(ship => {
      if (!Nationalities.hasOwnProperty(ship.nationality)) return false;

      const nationalities = Nationalities[ship.nationality];
      return nationalities.includes(faction);
    });

    if (!query.length) throw new Error(`Couldn't find any ships with faction \`${faction}\``);

    return query;
  }

  /**
   * Grabs a equiptment from database
   * @param id The equiptment's ID or name
   */
  async getEquipment(id: string) {
    const data = await this.getDataEquipments();
    const keys = Object.keys(data);
    const map = Object.keys(mapObject(data, obj => obj.names));
    const filter1 = keys.filter(item => item.includes(id));
    const filter2 = map.filter(item => data[item] === id);
    //console.log(filter1);
    //console.log(filter2);
    if (filter1.length) return data[filter1[0]];
    if (filter2.length) return data[filter2[0]];

    throw new UnknownEquipmentError(id);
  }
  /**
   * Grab chapter from database
   * @param id The chapter to search for
   * @param section The section/section name of the chapter to filter
   */
  async getChapter(id: string, section?: string) {
    const data = await this.getDataChapters();

    let result;
    //let find;
    let find = Object.keys(data).filter(item => item === id);
    if (section) {
      result = data[find[0]][section];
      //let first = Object.keys(data).filter(item => item.includes(id));
      //find = first[section];
      //console.log(find);
    } else {
      //find = Object.keys(data).filter(item => item.includes(id));
      result = data[find[0]];
    }
    //let result = data[find[0]];
    if (!result) throw new UnknownChapterError(id);
    return result;
  }
  /**
   * Grabs a voice line from database
   * @param id The ships's ID to get voice lines from
   */
  async getVoicelineInternal(id: string) {
    const data = await this.getDataVoicelines();
    let find = Object.keys(data).filter(item => item.includes(id));
    let result = data[find[0]];
    if (!result) throw new UnkonwnShipVoicelinesError(id);
    return result;
  }
  /**
   * Grabs a voice line from database
   * @param id The ships's name to get voice lines from
   */
  async getVoiceline(id: string) {
    let result;
    let idIsNum = /^\d+$/.test(id);
    if (idIsNum) {
      result = this.getVoicelineInternal(id);
    } else {
      const res = await this.getShip(id);
      result = this.getVoicelineInternal(res.id);
    }
    if (!result) throw new UnkonwnShipVoicelinesError(id);
    return result;
  }
  /**
   * Grab barrage from database
   * @param id The barrages name/id
   */
  async getBarrage(id: string) {
    const data = await this.getDataBarrage();
    let result = data.filter(obj => obj.id.includes(id));
    if (!result) throw new UnknownBarrageError(id);
    return result;
  }
}
