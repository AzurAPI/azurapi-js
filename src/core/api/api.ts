import Fuse from 'fuse.js';
import { Identifiable } from '../../types/identifiable';
import { AzurAPI } from '../../Client';
import FuseResult = Fuse.FuseResult;

export type Language = 'en' | 'cn' | 'jp' | 'kr';

export default class API<T extends Identifiable> {
    raw: T[];
    fuse?: Fuse<T>;
    private client: AzurAPI;

    constructor(client: AzurAPI, keys?: string[]) {
      this.raw = [];
      if (keys) this.fuse = new Fuse<T>(this.raw, { keys: keys, threshold: 0.4 });
      this.client = client;
    }

    setData(raw: T[]) {
      this.raw.splice(0, this.raw.length, ...raw);
      if (this.fuse) this.fuse.setCollection(this.raw);
    }

    fuze(name: string): FuseResult<T>[] {
      if (!this.fuse) return [];
      return this.fuse.search(name, { limit: 10 }).sort((a, b) => (b.score || 0) - (a.score || 0));
    }

    id(id: string): T | undefined {
      for (let item of this.raw) if (normalize(item.id.toUpperCase()) === normalize(id.toUpperCase())) return item;
      return undefined;
    }

    get(query: string): T | undefined {
      return this.id(query) || this.fuze(query)?.map(s => s.item)[0];
    }

    filter(predicate: (value: T, index: number, array: T[]) => unknown): T[] {
      return this.raw.filter(predicate);
    }

    map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[] {
      return this.raw.map(callbackfn);
    }

    forEach(callbackfn: (value: T, index: number, array: T[]) => void): void {
      return this.raw.forEach(callbackfn);
    }

    every(predicate: (value: T, index: number, array: T[]) => unknown): boolean {
      return this.raw.every(predicate);
    }

    some(predicate: (value: T, index: number, array: T[]) => unknown): boolean {
      return this.raw.some(predicate);
    }
}

const combining = /[\u0300-\u036F]/g;

export function normalize(string) {
  return string.normalize('NFKD').replace(combining, '');
}
