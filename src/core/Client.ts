import { EventEmitter } from 'events';
import Updater from './CacheUpdater';
import { Ships } from './api/api_ship';
import { Equipments } from './api/api_equipment';
import { Barrages } from './api/api_barrage';
import { Chapters } from './api/api_chapter';
import { Voicelines } from './api/api_voiceline';
import { datatype } from './Data';

export type Source = 'uncached' | 'local'

export interface CacheOptions {
  source?: Source;
  autoupdate?: boolean;
  rate?: number;
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
  public ships: Ships = new Ships(this);
  public equipments: Equipments = new Equipments(this);
  public chapters: Chapters = new Chapters(this);
  public voicelines: Voicelines = new Voicelines(this);
  public barrages: Barrages = new Barrages(this);
  public apis = {
    ships: this.ships,
    equipments: this.equipments,
    chapters: this.chapters,
    voicelines: this.voicelines,
    barrages: this.barrages
  };

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
    this.emit('ready');
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
