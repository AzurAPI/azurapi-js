import { EventEmitter } from 'events';
import CacheService, { CacheOptions } from './core/CacheService';

export class AzurAPI extends EventEmitter {
  public cache;
  public updater;
  public ready;
  constructor(options?: CacheOptions) {
    super();
    this.cache = new CacheService(this, options);
    this.updater = this.cache.updater;
    this.ready = this.cache.ready && this.cache.updater.ready;
  }
}
