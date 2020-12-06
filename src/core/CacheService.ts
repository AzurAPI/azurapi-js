// CacheService.ts
/**
 * Data Cache powered by node-cache
 * @packageDocumentation
 */

import NodeCache from 'node-cache';
/**
 * Cache class
 */
export default class CacheService {
  /**
   * Cache Client to use
   */
  private cache = new NodeCache();
  private ttl: number;

  /**
   * New [CacheService] instance
   * @param ttlSec Time to live in seconds
   */
  constructor(ttlSec: number) {
    this.cache = new NodeCache({ stdTTL: ttlSec, checkperiod: ttlSec * 0.2, useClones: false });
    this.ttl = ttlSec;
  }

  /**
   * Get a specific value from store
   * @param k Key to find
   * @param f Function to execute to set new key
   */
  get(k, f) {
    const value = this.cache.get(k);
    if (value) {
      return Promise.resolve(value);
    }

    return f.then((r: any) => {
      this.cache.set(k, r);
      return r;
    });
  }

  /**
   * Set a key in the cache
   * @param k Key
   * @param v Value
   * @param t Time to live
   */
  set(k, v, t?) {
    this.cache.set(k, v, t ? t : this.ttl);
  }

  /**
   * Delete a key value pair from the cache
   * @param k Key
   */
  del(k) {
    this.cache.del(k);
  }

  /**
   * Flush the cache
   */
  flush() {
    this.cache.flushAll();
  }
}
