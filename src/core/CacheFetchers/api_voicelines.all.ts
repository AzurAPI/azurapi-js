import { defineProperty } from './defp';
export default class VoiceLinesAll {
  public _cache
  constructor(cache) {
    defineProperty(this, '_cache', { value: cache, writable: false });
  }

  get data() {
    if (!this._cache._api_voicelines) return null;
    return this._cache._api_voicelines;
  }
}
