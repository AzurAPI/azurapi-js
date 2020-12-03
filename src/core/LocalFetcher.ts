// LocalFetcher.ts
/**
 * [EXPERIMENTAL] Get data from database using locally downloaded data
 * @packageDocumentation
 */

// WARNING: IDK IF THIS WORKS OR NOT - Rattley
import { readFileSync, stat } from 'fs';
import UnknownChapterError from '../errors/UnknownChapterError';
import UnknownEquipmentError from '../errors/UnknownEquipmentError';
import UnknownShipError from '../errors/UnknownShipError';
import UnknownBarrageError from '../errors/UnkonwnBarrageError';
import UnkonwnShipVoicelinesError from '../errors/UnknownShipVoicelinesError';
import { Nationalities, Nationality, mapObject } from './APIFetcher';
import Updater from './Updater';

/**
 * Fetcher to grab anything from the local database
 */
export default class LocalFetcher {
  /**
   * Grabs JSON data from file
   * @param file The file's name
   */
  async getLocal(file: string) {
    return JSON.parse(readFileSync(`${this.getDataDir}/${file}`).toString());
  }
  /**
   * Alias/Shortcut for <LocalFetcher>.getLocal('ships.json');
   */
  async getDataShips() {
    return this.getLocal('ships.json');
  }
  /**
   * Alias/Shortcut for <LocalFetcher>.getLocal('equipments.json');
   */
  async getDataEquipments() {
    return this.getLocal('equipments.json');
  }
  /**
   * Alias/Shortcut for <LocalFetcher>.getLocal('chapters.json');
   */
  async getDataChapters() {
    return this.getLocal('chapters.json');
  }
  /**
   * Alias/Shortcut for <LocalFetcher>.getLocal('voice-lines.json');
   */
  async getDataVoicelines() {
    return this.getLocal('voice-lines.json');
  }
  /**
   * Alias/Shortcut for <LocalFetcher>.getLocal('barrage.json');
   */
  async getDataBarrage() {
    return this.getLocal('barrage.json');
  }
  /**
   * Alias/Shortcut for <LocalFetcher>.getLocal('version-info.json');
   */
  async getDataVersion() {
    return this.getLocal('version-info.json');
  }
  /**
   * Internal fucntion to get the save data directory
   */
  async getDataDir() {
    stat('dat.json', (exists) => {
      if (exists === null) {
        return readFileSync('../dat.json').toString();
      } else if (exists.code === 'ENOENT') {
        console.log('The data directory does not exist.');
      }
    });
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
    const keys = Object.keys(data);
    const map = Object.keys(mapObject(data, obj => obj.names));
    const filter1 = keys.filter(item => item === id);
    const filter2 = map.filter(item => data[item] === id);
    console.log(filter1);
    console.log(filter2);
    if (filter1.length) return data[filter1[0]];
    if (filter2.length) return data[filter2[0]];

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
