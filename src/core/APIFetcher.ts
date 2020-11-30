import UnserialisedError from '../errors/UnserialisableError';
import UnknownShipError from '../errors/UnknownShipError';
import UnknownEquipmentError from '../errors/UnknownEquipmentError';
import UnkonwnShipVoicelinesError from '../errors/UnknownShipVoicelinesError';
import UnknownBarrageError from '../errors/UnkonwnBarrageError';
import UnknownChapterError from '../errors/UnknownChapterError'; 
import { HttpClient } from '@augu/orchid';

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

//Internal functions because I smol brain
function omap(object: any, mapFn: any) {
  return Object.keys(object).reduce((result, key) => {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
}

function ofilter(obj, predicate) {
  Object.keys(obj).filter(key => predicate(obj[key])).reduce((res, key) => (res[key] = obj[key], res), {});
}

/**
 * Fetcher to grab anything from the database on GitHub
 */
export default class APIFetcher {
  /**
   * The client to use to request
   */
  private http: HttpClient;

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
  }

  /**
   * Fetches all the ships
   */
  async getDataShips() {
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
   * Fetches ships list
   */
  async getDataShipsList() {
    const res = await this.http.get('/ships-list.json');
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
  async getDataEquipments() {
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
  async getDataChapters() {
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
  async getDataBarrage() {
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
  async getDataVoicelines() {
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
        if (ship.names[key] === id) return true;
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
    const map = omap(data, obj => obj.names.en) || omap(data, obj => obj.names.cn) || omap(data, obj => obj.names.jp) || omap(data, obj => obj.names.kr);
    //console.log(Object.keys(map).filter(item => map[item] === id));
    if (Object.keys(data).filter(item => item === id).length) return data[Object.keys(data).filter(item => item === id)[0]];
    if (Object.keys(map).filter(item => map[item] === id)) return data[Object.keys(map).filter(item => map[item] === id)[0]];

    throw new UnknownEquipmentError(id);
  }
  /**
   * Grab chapter from database
   * @param id The chapter to search for
   * @param section (optional)The section/section name of the chapter to filter
   */
  async getChapter(id: string, section?: string) {
    const data = await this.getDataChapters();

    let result;
    //let find;
    let find = Object.keys(data).filter(item => item === id);
    if (section) {
      result = data[find[0]][section];
      //let first = Object.keys(data).filter(item => item === id);
      //find = first[section];
      //console.log(find);
    } else {
      //find = Object.keys(data).filter(item => item === id);
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
    let find = Object.keys(data).filter(item => item === id);
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
    let result = data.filter(obj => obj.id === id);
    if (!result) throw new UnknownBarrageError(id);
    return result;
  }
}
