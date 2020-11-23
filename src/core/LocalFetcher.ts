// WARNING: THIS DOESN'T WORK AT ALL BECAUSE I HAVEN'T DO JSON FILE DIRECORIES YET
import UnknownShipError from '../errors/UnknownShipError';
import UnknownEquipmentError from '../errors/UnknownEquipmentError';
import { readFileSync } from 'fs';

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
 * Fetcher to grab anything from the local database
 */
export default class LocalFetcher {
  /**
   * Grabs JSON data from file
   * @param file The file's name and extension
   */
  async getLocal(file: string) {
    return JSON.parse(readFileSync(`/${file}`).toString());
  }
  /**
   * Grabs a ship from the database
   * @param id The ship's ID or name
   */
  async getShip(id: string) {
    const file = this.getLocal('ships.json');
    const ships = file.then(data => {
      data.filter(ship => {
        if (ship.id === id) return true;
        for (const key of Object.keys(ship.names)) {
          if (ship.names[key] === id) return true;
        }
      
        return false;
      });
    
      if (!ships.length) throw new UnknownShipError(id);
      return ships[0];
    });
  }

  /**
   * Grabs a ship from the database by it's faction name
   * @param faction The faction to get from
   */
  async getShipsFromFaction(faction: Nationality) {
    const file = this.getLocal('ships.json');
    const query = file.then(data => {
      data.filter(ship => {
        if (!Nationalities.hasOwnProperty(ship.nationality)) return false;
      
        const nationalities = Nationalities[ship.nationality];
        return nationalities.includes(faction);
      });
      
      if (!query.length) throw new Error(`Couldn't find any ships with faction \`${faction}\``);
      
      return query;
    });
  }

  /**
   * Grabs a equiptment from database
   * @param id The equiptment's ID or name
   */
  async getEquipment(id: string) {
    const file = this.getLocal('equipments.json');
    file.then(data => {
      const escapeLatinString = (string: any) => string.toLowerCase(/*string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').*/string.replace(/[!@#$%^&*(),.?":{}|<>' ]/g, ''));
      let find = Object.keys(data).filter(item => !~escapeLatinString(id).indexOf(id));
      let result = data[find[0]];
      if (!result) throw new UnknownEquipmentError(id);
      return (result);
    });
  }
}
