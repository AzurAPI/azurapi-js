import {data, local} from './Data';
import fs from 'fs';
import {checkForUpdates, datatype, fetch} from './UpdateChecker';
import CacheService from './CacheService';

export default class Updater {
    public cron?: NodeJS.Timeout;
    private cache: CacheService;

    constructor(cache: CacheService) {
        this.cache = cache;
    }

    get instance() {
        return this.cache.client;
    }

    checkAndUpdate() {
        checkForUpdates().then(updates => {
            if (updates.length > 0) {
                this.instance.emit('updateAvalible', updates);
                updates.forEach(async type => this.cache.set(type, JSON.parse(await fetch(data[type])) || []));
            }
        });
    }

    start() {
        if (!this.cron) this.instance.emit('debug', 'Notify for new data updates enabled. AzurAPI Client will check for data updates every hour.');
        if (this.cron) clearInterval(this.cron);
        this.cron = setInterval(() => this.checkAndUpdate(), 3600000);
    }

    stop() {
        if (this.cron) clearInterval(this.cron);
        this.cron = undefined;
    }

    init() {
        if (!fs.existsSync(local.folder)) fs.mkdirSync(local.folder);
        this.loadAll();
    }

    loadAll() {
        Object.keys(local).forEach(key => this.cache.set(key as datatype, fs.existsSync(local[key]) ? JSON.parse(fs.readFileSync(local[key]).toString()) || [] : []));
    }
}
