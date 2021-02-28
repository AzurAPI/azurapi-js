import { baseFolder, data, datatype, local } from './Data';
import fs from 'fs';
import { checkForUpdates, fetch } from './UpdateChecker';
import { AzurAPI } from '../Client';

export default class Updater {
    public cron?: NodeJS.Timeout;
    private client: AzurAPI;

    constructor(client: AzurAPI) {
      this.client = client;
    }

    checkAndUpdate() {
      return checkForUpdates().then(updates => {
        if (updates.length > 0) {
          this.client.emit('updateAvalible', updates);
          return Promise.all(updates.map(async type => {
            let raw = Object.values(JSON.parse(await fetch(data[type])) || []);
            this.client.set(type, raw);
            fs.writeFileSync(local[type], JSON.stringify(raw));
          }));
        }
      });
    }

    start() {
      if (!this.cron) this.client.emit('debug', 'Notify for new data updates enabled. AzurAPI Client will check for data updates every hour.');
      if (this.cron) clearInterval(this.cron);
      this.cron = setInterval(() => this.checkAndUpdate(), 3600000);
    }

    stop() {
      if (this.cron) clearInterval(this.cron);
      this.cron = undefined;
    }

    async init() {
      if (!fs.existsSync(baseFolder)) fs.mkdirSync(baseFolder);
      await this.loadAll();
    }

    loadAll() {
      for (let i = 0; i < Object.keys(local).length; i++) {
        let key = Object.keys(local)[i];
        if (!fs.existsSync(local[key])) return this.checkAndUpdate();
        this.client.set(key as datatype, Object.values(JSON.parse(fs.readFileSync(local[key]).toString()) || []));
      }
    }
}
