import fetch from 'node-fetch';
import UpdateChecker from './UpdateChecker';
import { local, data } from './Data';
import Utils from './Utils';
export default class Updater {
  private cache;
  public ready;
  public cron;
  constructor(cache) {
    this.cache = cache;
    this.ready = false;
    this.cron = null;
  }
  get instance() {
    return this.cache.client;
  }
  startcron() {
    if(!this.cron) this.instance.emit('debug', 'Notify for new data updates enabled. AzurAPI Client will check for data updates every hour.');
    if(this.cron) {
      clearInterval(this.cron);
      this.cron = null;
    }
    this.cron = setInterval(() => {
      this.check().then(data => {
        if(data.shipsUpdate || data.equipmentsUpdate /*|| data.chaptersUpdate || data.voicelinesUpdate || data.barragesUpdate*/) this.instance.emit('updateAvalible', data);
      }).catch(ex => this.instance.emit('error', ex));
    }, 3600000);
  }

  onStart() {
    if(this.ready) return;
    if(!Utils.existSync(local.folder)) Utils.createDirectorySync(local.folder);
    this.filesExist();
    this.loadAll();
    this.ready = true;
  }

  filesExist() {
    this.dirCheck(local.ships);
    this.dirCheck(local.equipments);
    this.dirCheck(local.chapters);
    this.dirCheck(local.voicelines);
    this.dirCheck(local.barrages);
    this.dirCheck(local.version);
  }

  loadAll() {
    this.cache.loadShips(JSON.parse(Utils.readFileSync(local.ships)));
    this.cache.loadEquipments(JSON.parse(Utils.readFileSync(local.equipments)));
    this.cache.loadChapters(JSON.parse(Utils.readFileSync(local.chapters)));
    this.cache.loadVoicelines(JSON.parse(Utils.readFileSync(local.voicelines)));
    this.cache.loadBarrages(JSON.parse(Utils.readFileSync(local.ships)));
  }

  dirCheck(dir: any) {
    if(!Utils.existSync(dir)) Utils.writeFileSync(dir, JSON.stringify({}));
  }

  async check() {
    const checker = new UpdateChecker();
    await checker.fetch();
    const shipsUpdate = checker.setType('ships').needsupdate();
    const equipmentsUpdate = checker.setType('equipments').needsupdate();
    // const chaptersUpdate = checker.setType('chapters').needsupdate();
    // const voicelinesUpdate = checker.setType('voicelines').needsupdate();
    // const barragesUpdate = checker.setType('barrages').needsupdate();
    return { shipsUpdate, equipmentsUpdate/*, chaptersUpdate, voicelinesUpdate, barragesUpdate*/ };
  }

  async update(type: string) {
    switch(type) {
      case 'data':
        const checker = new UpdateChecker();
        await checker.fetch();
        if(checker.nolocal()) {
          await this.updateStored('ships');
          await this.updateStored('equipments');
          await this.updateStored('chapters');
          await this.updateStored('voicelines');
          await this.updateStored('barrages');
          await checker.writeversion();
        } else {
          if(checker.setType('ships').needsupdate()) {
            await this.updateStored('ships');
            await checker.writeversion();
          }
          if(checker.setType('equipments').needsupdate()) {
            await this.updateStored('equipments');
            await checker.writeversion();
          }
          if(checker.setType('chapters').needsupdate()) {
            await this.updateStored('chapters');
            await checker.writeversion();
          }
          if(checker.setType('voicelines').needsupdate()) {
            await this.updateStored('voicelines');
            await checker.writeversion();
          }
          if(checker.setType('barrages').needsupdate()) {
            await this.updateStored('barrages');
            await checker.writeversion();
          }
        }
        break;
      case 'cache':
        this.cache.loadShips(await this.fetchLocal('ships'));
        this.cache.loadEquipments(await this.fetchLocal('equipments'));
        this.cache.loadChapters(await this.fetchLocal('chapters'));
        this.cache.loadVoicelines(await this.fetchLocal('voicelines'));
        this.cache.loadBarrages(await this.fetchLocal('barrages'));
        break;
      case 'both':
        await this.update('data');
        await this.update('cache');
        break;
    }
  }

  async updateStored(type: string) {
    switch(type) {
      case 'ships':
        await this.cache.clear(this.cache._api_ship_raw);
        await this.cache.clear(this.cache._api_ship);
        await this.cache.updateData('ships', await this.fetch('ships'));
      case 'equipments':
        await this.cache.clear(this.cache._api_equipments_raw);
        await this.cache.clear(this.cache._api_equipments);
        await this.cache.updateData('equipments', await this.fetch('equipments'));
      case 'chapters':
        await this.cache.clear(this.cache._api_chapters);
        await this.cache.updateData('chapters', await this.fetch('chapters'));
      case 'voicelines':
        await this.cache.clear(this.cache._api_voicelines);
        await this.cache.updateData('voicelines', await this.fetch('voicelines'));
      case 'barrages':
        await this.cache.clear(this.cache._api_barrages_raw);
        await this.cache.clear(this.cache._api_barrages);
        await this.cache.updateData('barrages', await this.fetch('barrages'));
    }
  }

  async fetch(type: string) {
    switch(type){
      case 'ships':
        return fetch(data.ships).then(d => d.text);
      case 'equipments':
        return fetch(data.equipments).then(d => d.text);
      case 'chapters':
        return fetch(data.chapters).then(d => d.text);
      case 'voicelines':
        return fetch(data.voicelines).then(d => d.text);
      case 'barrages':
        return fetch(data.barrages).then(d => d.text);
    }
  }

  async fetchLocal(type: string) {
    switch(type){
      case 'ships':
        return fetch(local.ships).then(d => JSON.parse(d));
      case 'equipments':
        return fetch(local.equipments).then(d => JSON.parse(d));
      case 'chapters':
        return fetch(local.chapters).then(d => JSON.parse(d));
      case 'voicelines':
        return fetch(local.voicelines).then(d => JSON.parse(d));
      case 'barrages':
        return fetch(local.barrages).then(d => JSON.parse(d));
    }
  }
}
