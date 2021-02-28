// CacheUpdater.ts
/**
 * Functions relating to updating the cache
 * @packageDocumentation
 */
import { baseFolder, data, datatype, local } from './Data';
import fs from 'fs';
import { check, fetch } from './UpdateChecker';
import { AzurAPI } from '../Client';

export default class Updater {
    public cron?: NodeJS.Timeout;
    private client: AzurAPI;

    /**
     * Constructor
     * @param client AzurAPI instance
     */
    constructor(client: AzurAPI) {
      this.client = client;
    }

    /**
     * Check for updates then update
     */
    update() {
      return check().then(updates => {
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

    /**
     * Start cron job
     */
    start() {
      if (!this.cron) this.client.emit('debug', 'Notify for new data updates enabled. AzurAPI Client will check for data updates every hour.');
      if (this.cron) clearInterval(this.cron);
      this.cron = setInterval(() => this.update(), this.client.rate);
    }

    /**
     * Stop cron job
     */
    stop() {
      if (this.cron) clearInterval(this.cron);
      this.cron = undefined;
    }

    /**
     * Check if folder exists and if not create it
     */
    async init() {
      if (!fs.existsSync(baseFolder)) fs.mkdirSync(baseFolder);
      await this.load();
    }

    /**
     * Load the cache
     */
    load() {
      for (let i = 0; i < Object.keys(local).length; i++) {
        let key = Object.keys(local)[i];
        if (!fs.existsSync(local[key])) return this.update();
        this.client.set(key as datatype, Object.values(JSON.parse(fs.readFileSync(local[key]).toString()) || []));
      }
    }
}
