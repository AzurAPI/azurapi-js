import { EventEmitter } from 'events';
import Updater from './CacheUpdater';
import { Ships } from './api/api_ship';
import { Equipments } from './api/api_equipment';
import { Barrages } from './api/api_barrage';
import { Chapters } from './api/api_chapter';
import { Voicelines } from './api/api_voiceline';
import * as Hiei from './api/hiei';
import { datatype } from './Data';

export type Source = 'uncached' | 'local' | 'hiei'

export interface CacheOptions {
  source?: Source;
  autoupdate?: boolean;
  rate?: number;
  hieiUrl?: string;
  hieiAuth?: string;
}

export let instance: AzurAPI;

/**
 * The main AzurAPI class
 */
export class AzurAPI extends EventEmitter {
  public options: CacheOptions;
  public source: string;
  public autoupdate: boolean;
  public rate: number;
  public updater: Updater;
  public ships: Ships | Hiei.Ships/* = new Ships(this)*/;
  public equipments: Equipments | Hiei.Equipments/* = new Equipments(this)*/;
  public chapters: Chapters | Hiei.Chapters/* = new Chapters(this)*/;
  public voicelines: Voicelines | Hiei.Voicelines/* = new Voicelines(this)*/;
  public barrages: Barrages | Hiei.Barrages/* = new Barrages(this)*/;
  public apis: object/* = {
    ships: this.ships,
    equipments: this.equipments,
    chapters: this.chapters,
    voicelines: this.voicelines,
    barrages: this.barrages
  }*/;

  /**
   * Cache client
   * @param options options for the cache
   */
  constructor(options?: CacheOptions) {
    super();
    //Make sure people are using Node <=14
    if (parseFloat(process.version.replace('v', '')) <= 14) throw new Error('AzurAPI requires Node v14 or above, if you would like to use an older Node version, please use any version of this package below v0.2.13 (Not Recommended)');
    this.options = options ? options : { source: 'local', autoupdate: true, rate: 3600000 };
    this.source = this.options.source ? this.options.source : 'local';
    this.autoupdate = this.options.autoupdate ? this.options.autoupdate : true;
    this.rate = this.options.rate ? this.options.rate : 3600000;
    if (this.source === 'hiei' && !this.options.hieiUrl) throw new Error('Option "hieiUrl" cannot be undefined when "source" is set to "hiei"');
    if (this.source === 'hiei') {
      this.ships = new Hiei.Ships(this);
      this.equipments = new Hiei.Equipments(this);
      this.chapters = new Hiei.Chapters(this);
      this.voicelines = new Hiei.Voicelines(this);
      this.barrages = new Hiei.Barrages(this);
    } else {
      this.ships = new Ships(this);
      this.equipments = new Equipments(this);
      this.chapters = new Chapters(this);
      this.voicelines = new Voicelines(this);
      this.barrages = new Barrages(this);
    }
    this.apis = {
      ships: this.ships,
      equipments: this.equipments,
      chapters: this.chapters,
      voicelines: this.voicelines,
      barrages: this.barrages
    };
    this.updater = new Updater(this);
    this.updater.init();
    if (this.autoupdate && this.source === 'local') this.updater.start();
    instance = this;
  }

  /**
   * Set data in cache
   * @param type A type of data (ship, equipment, voiceline, chapter, or barrage)
   * @param raw Raw data in array
   */
  set(type: datatype, raw: any[]) {
    if (!raw) return;
    let api = this.apis[type];
    if (api) api.setData(raw);
    return api;
  }
}
