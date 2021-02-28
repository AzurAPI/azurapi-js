import { EventEmitter } from 'events';
import Updater from './core/CacheUpdater';
import { Ships } from './core/api/api_ship';
import API from './core/api/api';
import { Equipment } from './types/equipment';
import { Chapter } from './types/chapter';
import { Voiceline } from './types/voiceline';
import { Barrage } from './types/barrage';
import { datatype } from './core/Data';

export interface CacheOptions {
    autoupdate?: boolean;
}

export let instance: AzurAPI;

export class AzurAPI extends EventEmitter {
    public options: CacheOptions
    public updater: Updater;
    public ships = new Ships(this);
    public equipments = new API<Equipment>(this, ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code', 'id'])
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
      this.options = options ? options : { autoupdate: true };
      this.updater = new Updater(this);
      this.updater.init().then(() => this.emit('ready'));
      if (this.options.autoupdate) this.updater.start();
      instance = this;
    }

    set(type: datatype, raw: any[]) {
      if (!raw) return;
      let api = this.apis[type];
      if (api) api.setData(raw);
      return api;
    }
}
