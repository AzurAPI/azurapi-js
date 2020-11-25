import APIFetcher, { Nationality } from './core/APIFetcher';
import LocalFetcher from './core/LocalFetcher';
import { EventEmitter } from 'events';
import { merge } from './util/merge';
import { join } from 'path';
//import Updater from './core/Updater';

interface NulledClientOptions {
  directory?: string;
  update?: number | boolean;
}

interface NonNulledClientOptions {
  directory: string;
  update: number | boolean;
}

export class AzurAPIClient extends EventEmitter {
  /**
   * The API fetcher to grab items from the database
   */
  private fetcher: APIFetcher;

  /**
   * The API fetcher to grab items from the database
   */
  //private local: LocalFetcher;

  /**
   * The updater to update the local database
   */
  //private updater: Updater;

  /**
   * The options the user has set
   */
  public options: NonNulledClientOptions;

  /**
   * Creates a new [AzurAPIClient] instance
   * @param directory The directory to host the database, defaults to `$CURRENT/.azurapi`
   */
  constructor(options?: NulledClientOptions) {
    super();

    this.fetcher = new APIFetcher();
    //this.local = new LocalFetcher();
    //this.updater = new Updater(directory || join(process.cwd(), '.azurapi'));
    this.options = merge<any, NonNulledClientOptions>(options, {
      directory: join(process.cwd(), '.azurapi'),
      update: false
    });

    // Add backwards compatibility (readonly variable since this is outside of the constructor's scope)
    const backwards: Readonly<string[]> = [
      'getShipByEnglishName', 
      'getShipsByChineseName', 
      'getShipsById',
      'getShipsByKoreanName'
    ] as const;

    for (let i = 0; i < backwards.length; i++) {
      const method = backwards[i];
      this[method] = function (this: AzurAPIClient, query: string) {
        return this.getShip(query);
      };
    }
  }

  /**
   * Returns a list of ships available
   */
  getShips() {
    return this.fetcher.getDataShips();
  }

  /**
   * Returns a list of equipments avalible
   */
  getEquipments() {
    return this.fetcher.getDataEquipments();
  }

  /**
   * Returns a list of chapters
   */
  getChapters() {
    return this.fetcher.getDataChapters();
  }

  /**
   * Returns a list of voicelines
   */
  getVoicelines() {
    return this.fetcher.getDataVoicelines();
  }

  /**
   * Returns a list of barrages avalible
   */
  getBarrages() {
    return this.fetcher.getDataBarrage();
  }
   
  /**
   * Gets the ship by it's query
   * @param query The query (id or name)
   */
  getShip(query: string) {
    return this.fetcher.getShip(query);
  }

  /**
   * Gets the ship by the faction
   * @param faction The faction to find ships from
   */
  getShipsByFaction(faction: Nationality) {
    return this.fetcher.getShipsFromFaction(faction);
  }

  /**
   * Gets the equipment by it's query
   * @param query The query (name)
   */
  getEquipment(query: string) {
    return this.fetcher.getEquipment(query/*, type*/);
  }

  /**
   * Gets chapter by query
   * @param chapter The chapter to search for
   * @param section (Optional) The section to search for
   */
  getChapter(chapter: string, section?: string) {
    return this.fetcher.getChapter(chapter, section);
  }
  
  /**
   * Gets the voice line for ship by it's query
   * @param query The query (ship ID)
   */
  getVoiceline(query: string) {
    return this.fetcher.getVoiceline(query);
  }
  /**
   * Gets barrage from ID
   * @param query The query (barrage ID)
   */
  getBarrage(query:string) {
    return this.fetcher.getBarrage(query);
  }
}
