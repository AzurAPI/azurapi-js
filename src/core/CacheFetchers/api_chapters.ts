import UnknownChapterError from '../../errors/UnknownChapterError';
import { defineProperty } from './defp';

export default class Chapters {
    public _cache

    constructor(cache) {
      defineProperty(this, '_cache', { value: cache, writable: false });
    }

    get data() {
      if (!this._cache._api_chapters) return null;
      return this._cache._api_chapters;
    }

    async getChapter(id: string, section?: string) {
      const data = await this.data;
      let result;
      let find = Object.keys(data).filter(item => item === id);
      if (section) {
        result = data[find[0]][section];
      } else {
        result = data[find[0]];
      }
      if (!result) throw new UnknownChapterError(id);
      return result;
    }
}
