import UnserialisedError from '../errors/UnserialisableError';
import UnknownShipError from '../errors/UnknownShipError';
import UnknownEquipmentError from '../errors/UnknownEquipmentError';
import { HttpClient } from '@augu/orchid';

export type Nationality = 'USS' | 'Eagle Union' | 'HMS' | 'Royal Navy' | 'IJN' | 'Sakura Empire'
  | 'KMS' | 'Iron Blood' | 'ROC' | 'Eastern Radiance' | 'SN' | 'North Union' | 'FNFF' | 'Iris Libre'
  | 'MNF' | 'Vichya Domination' | 'RN' | 'Sardenga Empire' | 'HDN' | 'Neptunia' | 'Bilibili' | 'Utawarerumono'
  | 'KizunaAI' | 'Hololive';

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
   * Fetches all the memories
   */
  async getDataMemories() {
    const res = await this.http.get('/memories.json');
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
   * Fetches all the events
   */
  async getDataEvents() {
    const res = await this.http.get('/events.json');
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
   * Fetches id map
   */
  async getDataIDMap() {
    const res = await this.http.get('/id-map.json');
    let data: any[] = [];

    try {
      data = res.json();
    } catch(ex) {
      throw new UnserialisedError();
    }

    return data;
  }

  /**
   * Fetches path sizes
   */
  async getDataPathSizes() {
    const res = await this.http.get('/path-sizes.json');
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
    const escapeLatinString = (string: any) => string.toLowerCase(string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[!@#$%^&*(),.?":{}|<>' ]/g, ''));
    let find = Object.keys(data).findIndex(item => escapeLatinString(item).includes(escapeLatinString(id)));
    //let find = data.indexOf((item: string) => escapeLatinString(item).includes(escapeLatinString(id)));
    //let find = data.findIndex(item => escapeLatinString(item).includes(escapeLatinString(id)));
    if (data[find]) return (data[find]);
    throw new UnknownEquipmentError(id);
  }
}
