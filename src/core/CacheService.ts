/* eslint-disable camelcase */
// CacheService.ts
import Fuse from 'fuse.js';
import Barrage from './CacheFetchers/api_barrage';
import BarrageAll from './CacheFetchers/api_barrage.all';
import Chapters from './CacheFetchers/api_chapters';
import ChaptersAll from './CacheFetchers/api_chapters.all';
import Equipments from './CacheFetchers/api_equipments';
import EquipmentsAll from './CacheFetchers/api_equipments.all';
import Ships from './CacheFetchers/api_ship';
import ShipsAll from './CacheFetchers/api_ship.all';
import ShipsFilter from './CacheFetchers/api_ship.filter';
import VoiceLines from './CacheFetchers/api_voicelines';
import VoiceLinesAll from './CacheFetchers/api_voicelines.all';
import { local } from './Data';
import Updater from './CacheUpdater';
import { datatype } from './UpdateChecker';
import { AzurAPI } from '../Client';

type DataSource = 'Online' | 'Hiei' | 'Local'

export interface CacheOptions {
    source?: DataSource;
    autoupdate?: boolean;
}

const keys = {
  ships: ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code', 'id'],
  equipments: ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code', 'id'],
  barrages: ['id', 'name']
};

/**
 * Data Cache (largely copying saratoga cuz rattley dum)
 * @packageDocumentation
 */
export default class CacheService {
    public ready: boolean
    public client: AzurAPI;
    public options: CacheOptions
    public updater: Updater;
    public all
    public ship
    public equipments
    public chapters
    public voicelines
    public barrages
    public raw = new Map<datatype, any[]>();
    public fuses = new Map<datatype, Fuse<any>>();

    /**
     * Cache client
     * @param client class/client that generated this cache
     * @param options options for the cache
     */
    constructor(client, options?: CacheOptions) {
      this.client = client;
      this.options = options ? options : {
        autoupdate: true
      };
      this.ready = false;
      this.updater = new Updater(this);
      this.ship = new Ships(this);
      this.ship.all = new ShipsAll(this);
      this.ship.filter = new ShipsFilter(this);
      this.equipments = new Equipments(this);
      this.equipments.all = new EquipmentsAll(this);
      this.chapters = new Chapters(this);
      this.chapters.all = new ChaptersAll(this);
      this.voicelines = new VoiceLines(this);
      this.voicelines.all = new VoiceLinesAll(this);
      this.barrages = new Barrage(this);
      this.barrages.all = new BarrageAll(this);
      this.updater.init();
      this.updater.checkAndUpdate();
      Object.keys(local).forEach(key => this.client.emit('debug', `${key}: ${local[key]}`));
      if (this.options.autoupdate) this.updater.start();
      this.client.emit('ready');
    }

    set(type: datatype, raw: any[]) {
      if (!raw) return;
      if (!this.raw[type]) this.raw[type] = raw;
      this.raw[type].splice(0, this.raw[type].length, ...raw);
      if (keys[type]) {
        let fuse = this.fuses.get(type);
        if (fuse) fuse.setCollection(raw);
        else this.fuses.set(type, new Fuse(raw, {
          keys: keys[type],
          threshold: 0.4
        }));
      }
    }
}
