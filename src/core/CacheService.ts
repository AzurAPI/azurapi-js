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
import { defineProperty } from './CacheFetchers/defp';
import Utils from './Utils';
import { local, data } from './Data';
import Updater from './CacheUpdater';

type DataSource = 'Online' | 'Hiei' | 'Local'

export interface CacheOptions {
  source?: DataSource;
  autoupdate?: boolean;
}

/**
 * Data Cache (largely copying saratoga cuz rattley dum)
 * @packageDocumentation
 */
export default class CacheService {
  public client
  public options
  public ready
  public source
  public autoupdate
  public updater
  public all
  public ship
  public equipments
  public chapters
  public voicelines
  public barrages
  public _api_ship
  public _api_equipments
  public _api_chapters
  public _api_voicelines
  public _api_barrages
  public _api_ship_raw
  public _api_equipments_raw
  public _api_barrages_raw

  /**
   * Cache client
   * @param client class/client that generated this cache
   * @param options options for the cache
   */
  constructor(client, options?: CacheOptions) {
    this.client = client;
    this.options = options ? options : { 
      source: null,
      autoupdate: true
    };
    this.ready = false;
    this.source = this.options.source ? this.options.source : 'Local';
    this.autoupdate = this.options.autoupdate ? this.options.autoupdate : true;
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

    defineProperty(this, '_api_ship', { value: null, writable: true });
    defineProperty(this, '_api_equipments', { value: null, writable: true });
    defineProperty(this, '_api_chapters', { value: null, writable: true });
    defineProperty(this, '_api_voicelines', { value: null, writable: true });
    defineProperty(this, '_api_barrages', { value: null, writable: true });
    defineProperty(this, '_api_ship_raw', { value: null, writable: true });
    defineProperty(this, '_api_equipments_raw', { value: null, writable: true });
    defineProperty(this, '_api_barrages_raw', { value: null, writable: true }); 

    this.updater.onStart();

    this.onFirstStart().then(() => {
      if(this.ready) return;
      if(this.autoupdate) this.updater.startcron();
      this.ready = true;
      this.client.emit('ready')/*.catch(ex => {
        this.client.emit('error', ex);
      })*/;
    });
  }

  async onFirstStart() {
    if(this.ready) return;
    // BUG: NOT UPDATING. HOTFIX: UPDATE ON FIRST START
    await this.updater.update('both');
    // let update = await this.updater.check();
    // update = update.shipsUpdate || update.equipmentsUpdate /*|| update.chaptersUpdate || update.voicelinesUpdate || update.barragesUpdate*/;
    this.client.emit('debug', `Loaded stored ships from ${local.ships}`);
    this.client.emit('debug', `Loaded raw ships from ${local.ships}`);
    this.client.emit('debug', `Loaded stored equipments from ${local.ships}`);
    this.client.emit('debug', `Loaded raw equipments from ${local.equipments}`);
    this.client.emit('debug', `Loaded raw chapters from ${local.chapters}`);
    this.client.emit('debug', `Loaded raw voicelines from ${local.voicelines}`);
    this.client.emit('debug', `Loaded stored barrages from ${local.ships}`);
    this.client.emit('debug', `Loaded raw barrages from ${local.barrages}`);
  }
  
  loadShips(raw: any) {
    if (!raw) return;
    this.clear(this._api_ship_raw);
    this._api_ship_raw = raw;
    raw = Object.values(raw);
    if (!raw.length) return;
    this.clear(this._api_ship);
    this._api_ship = new Fuse(raw, { keys: ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code', 'id'], threshold: 0.4 });
  }

  loadEquipments(raw: any) {
    if (!raw) return;
    this.clear(this._api_equipments_raw);
    this._api_equipments_raw = raw;
    raw = Object.values(raw);
    if (!raw.length) return;
    this.clear(this._api_equipments);
    this._api_equipments = new Fuse(raw, { keys: ['names.en', 'names.cn', 'names.jp', 'names.kr', 'id'], threshold: 0.4 });
  }

  loadChapters(raw: any) {
    if (!raw) return;
    this.clear(this._api_chapters);
    this._api_chapters = raw;
  }

  loadVoicelines(raw: any) {
    if (!raw) return;
    this.clear(this._api_voicelines);
    this._api_voicelines = raw;
  }

  loadBarrages(raw: any) {
    if (!raw) return;
    this.clear(this._api_barrages_raw);
    this._api_barrages_raw = raw;
    raw = Object.values(raw);
    if (!raw.length) return;
    this.clear(this._api_barrages);
    this._api_barrages = new Fuse(raw, { keys: ['id', 'name'], threshold: 0.4 });
  }

  clear(src: any) {
    src = null;
  }

  async updateData(src: string, data: any) {
    switch(src){
      case('ships'):
        return await Utils.writeFileSync(local.ships, typeof data === 'string' ? data : JSON.stringify(data));
      case('equipments'):
        return await Utils.writeFileSync(local.equipments, typeof data === 'string' ? data : JSON.stringify(data));
      case('chapters'):
        return await Utils.writeFileSync(local.chapters, typeof data === 'string' ? data : JSON.stringify(data));
      case('voicelines'):
        return await Utils.writeFileSync(local.voicelines, typeof data === 'string' ? data : JSON.stringify(data));
      case('barrages'):
        return await Utils.writeFileSync(local.barrages, typeof data === 'string' ? data : JSON.stringify(data));
    }
  }
}
