import { EventEmitter } from 'events';
import CacheService, { CacheOptions } from './core/CacheService';
import Updater from './core/CacheUpdater';

export class AzurAPI extends EventEmitter {
    public cache: CacheService;
    public updater: Updater;

    constructor(options?: CacheOptions) {
      super();
      this.cache = new CacheService(this, options);
      this.updater = this.cache.updater;
    }
}
