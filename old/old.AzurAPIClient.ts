// AzurAPIClient.ts
/**
 * Client Class and interfaces
 * @packageDocumentation
 */

import APIFetcher, { Nationality } from '../src/core/old.APIFetcher';
import LocalFetcher from './old.LocalFetcher';
import HieiFetcher from '../src/core/old.HieiFetcher';
import { EventEmitter } from 'events';
import { merge } from './util/merge';
import { join } from 'path';
//import Updater from './core/Updater';

interface NulledClientOptions {
  directory?: string;
  update?: number | boolean;
  url?: string;
  auth?: string;
}

interface NonNulledClientOptions {
  directory: string;
  update: number | boolean;
  url: string;
  auth: string;
}

type dataSource = 'hiei' | 'Local' | 'Cache'

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
   * The Hiei fetcher to grab items from hiei
   */
  private hiei: HieiFetcher;

  /**
   * The updater to update the local database
   */
  //private updater: Updater;

  /**
   * Hiei data root url
   */
  private hieiURL: string;

  /**
   * Hiei auth
   */
  private hieiAuth: string;

  /**
   * Data source
   */
  public source: dataSource;

  /**
   * The options the user has set
   */
  public options: NonNulledClientOptions;

  /**
   * Creates a new [AzurAPIClient] instance
   * @param directory The directory to host the database, defaults to `$CURRENT/.azurapi`
   */
  constructor(source?: dataSource, options?: NulledClientOptions) {
    super();

    this.fetcher = new APIFetcher();
    this.local = new LocalFetcher();
    this.options = merge<any, NonNulledClientOptions>(options, {
      directory: join(process.cwd(), '.azurapi'),
      update: false,
      url: undefined,
      auth: undefined
    });
    //this.updater = new Updater(this.options.directory);
    this.hieiURL = this.options.url;
    this.hieiAuth = this.options.auth;
    this.hiei = new HieiFetcher(this.hieiURL, this.hieiAuth);
    this.source = source ? source : 'Local';

    /**
     * Update if option update is true
     */
    if(this.options.update) {
      //this.updater;
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
   * @example <client>.getShip('query');
   */
  getShip(query: string) {
    let r;
    switch(this.source) {
      case ('Local'):
        r = this.local.getShip(query);
        break;
      case ('hiei'):
        r = this.hiei.getShip(query);
        break;
      default:
        r = this.fetcher.getShip(query);
    }
    return r;
    //return this.fetcher.getShip(query);
  }

  /**
   * [Hiei Only] Get ship by ID
   * @param query Ship ID
   */
  getShipById(query: string) {
    if (this.source === 'hiei') {
      return this.hiei.getShipById(query);
    }
  }

  /**
   * [Hiei Only] Get ship by rarity
   * @param query Ship Rarity
   */
  getShipByRarity(query: string) {
    if (this.source === 'hiei') {
      return this.hiei.getShipByRarity(query);
    }
  }

  /**
   * [Hiei Only] Get ship by Hull Type
   * @param query Ship Hull Type
   */
  getShipByHullType(query: string) {
    if (this.source === 'hiei') {
      return this.hiei.getShipByHullType(query);
    }
  }

  /**
   * [Hiei Only] Get ship by Class
   * @param query Ship Class
   */
  getShipByClass(query: string) {
    if (this.source === 'hiei') {
      return this.hiei.getShipByClass(query);
    }
  }

  /**
   * Gets the ship by the faction
   * @param faction The faction to find ships from
   * @example <client>.getShipByFaction('faction');
   */
  getShipsByFaction(faction: Nationality) {
    let r;
    switch(this.source) {
      case ('Local'):
        r = this.local.getShipsFromFaction(faction);
        break;
      case ('hiei'):
        r = this.hiei.getShipByNationality(faction);
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
   * @example <client>.getEquipment('query');
   */
  getEquipment(query: string) {
    let r;
    switch(this.source) {
      case ('Local'):
        r = this.local.getEquipment(query);
        break;
      case ('hiei'):
        r = this.hiei.getEquipment(query);
        break;
      default:
        r = this.fetcher.getEquipment(query);
    }
    return r;
    //return this.fetcher.getEquipment(query/*, type*/);
  }

  /**
   * [Hiei Only] Get equipment by Nationality
   * @param query Equipment Nationality
   */
  getEquipmentByNationality(query: Nationality) {
    if(this.source === 'hiei') {
      return this.hiei.getEquipmentByNationality(query);
    }
  }

  /**
   * [Hiei Only] Get equipment by Category
   * @param query Equipment Category
   */
  getEquipmentByCategory(query: string) {
    if(this.source === 'hiei') {
      return this.hiei.getEquipmentByCategory(query);
    }
  }

  /**
   * Gets chapter by query
   * @param chapter The chapter to search for
   * @param section (Optional) The section to search for
   * @param online Use online mode (defaults to true)
   * @example <client>.getChapter('query', 'section');
   */
  getChapter(chapter: string, section?: string) {
    let r;
    switch(this.source) {
      case ('Local'):
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
   * @example <client>.getVoiceline('query');
   */
  getVoiceline(query: string) {
    let r;
    switch(this.source) {
      case ('Local'):
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
   * @example <client>.getBarrage('query');
   */
  getBarrage(query: string) {
    let r;
    switch(this.source) {
      case ('Local'):
        r = this.local.getBarrage(query);
        break;
      default:
        r = this.fetcher.getBarrage(query);
    }
    return r;
    //return this.fetcher.getBarrage(query);
  }
}
