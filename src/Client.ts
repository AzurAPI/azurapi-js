import { EventEmitter } from 'events';
import Updater from './core/CacheUpdater';
import { Ships } from './core/api/api_ship';
import API from './core/api/api';
import { Equipment } from './types/equipment';
import { Chapter } from './types/chapter';
import { Voiceline } from './types/voiceline';
import { Barrage } from './types/barrage';
import { datatype } from './core/Data';

export type Source = 'uncached' | 'local' | 'hiei'

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
    public ships = new Ships(this);
    public equipments = new API<Equipment>(this, ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code', 'id']);
    public chapters = new API<Chapter>(this);
    public voicelines = new API<Voiceline>(this);
    public barrages = new API<Barrage>(this, ['id', 'name']);
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
      this.options = options ? options : { source: 'local', autoupdate: true, rate: 3600000 };
      this.source = this.options.source ? this.options.source : 'local';
      this.autoupdate = this.options.autoupdate ? this.options.autoupdate : true;
      this.rate = this.options.rate ? this.options.rate : 3600000;
      this.updater = new Updater(this);
      this.updater.init();
      if (this.autoupdate) this.updater.start();
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
