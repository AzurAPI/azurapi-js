// AzurAPIClient.ts
/**
 * Client Class and interfaces
 * @packageDocumentation
 */

import APIFetcher, { Nationality } from './core/APIFetcher';
import LocalFetcher from './core/LocalFetcher';
import { EventEmitter } from 'events';
import { merge } from './util/merge';
import { join } from 'path';
import Updater from './core/Updater';

interface NulledClientOptions {
  directory?: string;
  update?: number | boolean;
  customDataURL?: string;
}

interface NonNulledClientOptions {
  directory: string;
  update: number | boolean;
  customDataURL: string | undefined;
}

/**
 * Base AzurAPIClient Class
 */
export class AzurAPIClient extends EventEmitter {
  /**
   * The API fetcher to grab items from the database
   */
  private fetcher: APIFetcher;

  /**
   * The Local fetcher to grab items from the local database
   */
  private local: LocalFetcher;

  /**
   * The updater to update the local database
   */
  private updater: Updater;

  /**
   * Custom data url
   */
  private dataURL: any;

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
    this.local = new LocalFetcher();
    this.options = merge<any, NonNulledClientOptions>(options, {
      directory: join(process.cwd(), '.azurapi'),
      update: false,
      customDataURL: undefined
    });
    this.updater = new Updater(this.options.directory);
    this.dataURL = this.options.customDataURL ? this.options.customDataURL : false;

    /**
     * Update if option update is true
     */
    if(this.options.update) {
      this.updater;
    }

    /** 
     * Add backwards compatibility (readonly variable since this is outside of the constructor's scope)
     */
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
   * Returns a list of ships available from github hosted data
   * @example <client>.getShips();
   */
  getShips() {
    return this.fetcher.getDataShips();
  }

  /**
   * Returns a list of equipments avalible from github hosted data
   * @example <client>.getEquipments();
   */
  getEquipments() {
    return this.fetcher.getDataEquipments();
  }

  /**
   * Returns a list of chapters from github hosted data
   * @example <client>.getChapters();
   */
  getChapters() {
    return this.fetcher.getDataChapters();
  }

  /**
   * Returns a list of voicelines from github hosted data
   * @example <client>.getVoicelines();
   */
  getVoicelines() {
    return this.fetcher.getDataVoicelines();
  }

  /**
   * Returns a list of barrages avalible from github hosted data
   * @example <client>.getBarrages();
   */
  getBarrages() {
    return this.fetcher.getDataBarrage();
  }

  /**
   * Returns a list of ships available from local data
   * @example <client>.getLocalShips();
   */
  getLocalShips() {
    return this.local.getDataShips();
  }

  /**
   * Returns a list of equipments avalible from local data
   * @example <client>.getLocalEquipments();
   */
  getLocalEquipments() {
    return this.local.getDataEquipments();
  }

  /**
   * Returns a list of chapters from local data
   * @example <client>.getLocalChapters();
   */
  getLocalChapters() {
    return this.local.getDataChapters();
  }

  /**
   * Returns a list of voicelines from local data
   * @example <client>.getLocalVoicelines();
   */
  getLocalVoicelines() {
    return this.local.getDataVoicelines();
  }

  /**
   * Returns a list of barrages avalible from local data
   * @example <client>.getLocalBarrages();
   */
  getLocalBarrages() {
    return this.local.getDataBarrage();
  }

  /**
   * Gets the ship by it's query
   * @param query The query (id or name)
   * @param online Use online mode (defaults to true)
   * @example <client>.getShip('query');
   */
  getShip(query: string, online?: boolean) {
    let r;
    switch(online) {
      case (false):
        r = this.local.getShip(query);
        break;
      default:
        r = this.fetcher.getShip(query);
    }
    return r;
    //return this.fetcher.getShip(query);
  }

  /**
   * Gets the ship by the faction
   * @param faction The faction to find ships from
   * @param online Use online mode (defaults to true)
   * @example <client>.getShipByFaction('faction');
   */
  getShipsByFaction(faction: Nationality, online?: boolean) {
    let r;
    switch(online) {
      case (false):
        r = this.local.getShipsFromFaction(faction);
        break;
      default:
        r = this.fetcher.getShipsFromFaction(faction);
    }
    return r;
    //return this.fetcher.getShipsFromFaction(faction);
  }

  /**
   * Gets the equipment by it's query
   * @param query The query (name)
   * @param online Use online mode (defaults to true)
   * @example <client>.getEquipment('query');
   */
  getEquipment(query: string, online?: boolean) {
    let r;
    switch(online) {
      case (false):
        r = this.local.getEquipment(query);
        break;
      default:
        r = this.fetcher.getEquipment(query);
    }
    return r;
    //return this.fetcher.getEquipment(query/*, type*/);
  }

  /**
   * Gets chapter by query
   * @param chapter The chapter to search for
   * @param section (Optional) The section to search for
   * @param online Use online mode (defaults to true)
   * @example <client>.getChapter('query', 'section');
   */
  getChapter(chapter: string, section?: string, online?: boolean) {
    let r;
    switch(online) {
      case (false):
        r = this.local.getChapter(chapter, section);
        break;
      default:
        r = this.fetcher.getChapter(chapter, section);
    }
    return r;
    //return this.fetcher.getChapter(chapter, section);
  }
  
  /**
   * Gets the voice line for ship by it's query
   * @param query The query (ship ID)
   * @param online Use online mode (defaults to true)
   * @example <client>.getVoiceline('query');
   */
  getVoiceline(query: string, online?: boolean) {
    let r;
    switch(online) {
      case (false):
        r = this.local.getVoiceline(query);
        break;
      default:
        r = this.fetcher.getVoiceline(query);
    }
    return r;
    //return this.fetcher.getVoiceline(query);
  }
  /**
   * Gets barrage from ID
   * @param query The query (barrage ID)
   * @param online Use online mode (defaults to true)
   * @example <client>.getBarrage('query');
   */
  getBarrage(query: string, online?: boolean) {
    let r;
    switch(online) {
      case (false):
        r = this.local.getBarrage(query);
        break;
      default:
        r = this.fetcher.getBarrage(query);
    }
    return r;
    //return this.fetcher.getBarrage(query);
  }
}
