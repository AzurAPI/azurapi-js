import { datatype } from '../UpdateChecker';
import CacheService from '../CacheService';

export default class API {
    public data?: any[];

    constructor(key: datatype, cache: CacheService) {
      this.data = cache.raw.get(key);
    }
}
