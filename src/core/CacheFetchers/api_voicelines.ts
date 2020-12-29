import UnkonwnShipVoicelinesError from '../../errors/UnknownShipVoicelinesError';
import { defineProperty } from './defp';
import CacheService from '../CacheService';
export default class VoiceLines {
  public _cache
  constructor(cache) {
    defineProperty(this, '_cache', { value: cache, writable: false });
  }

  get data() {
    if (!this._cache._api_voicelines) return null;
    return this._cache._api_voicelines;
  }

  /**
   * Grabs a voice line from database
   * @param id The ships's ID to get voice lines from
   */
  private async getInternal(id: string) {
    const data = await this.data;
    let find = Object.keys(data).filter(item => item.includes(id));
    let result = data[find[0]];
    if (!result) throw new UnkonwnShipVoicelinesError(id);
    return result;
  }
  /**
   * Grabs a voice line from database
   * @param id The ships's name to get voice lines from
   */
  async get(id: string) {
    let result;
    let idIsNum = /^\d+$/.test(id);
    if (idIsNum) {
      result = this.getInternal(id);
    } else {
      const res = await new CacheService().ship.get(id);
      result = this.getInternal(res.id);
    }
    if (!result) throw new UnkonwnShipVoicelinesError(id);
    return result;
  }
}
