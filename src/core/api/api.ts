// api.ts
/**
 * Default api function
 * @packageDocumentation
 */
import Fuse from 'fuse.js';
import { Identifiable } from '../../types/identifiable';
import { AzurAPI } from '../Client';
import FuseResult = Fuse.FuseResult;

export type Language = 'en' | 'cn' | 'jp' | 'kr';

export interface advancedOptions {
  nameOnly?: boolean,
  idOnly?: boolean,
  language?: Language
}

export const NATIONS = {
  'Eagle Union': ['uss', 'eagle union'],
  'Royal Navy': ['hms', 'royal navy'],
  'Sakura Empire': ['ijn', 'sakura empire'],
  'Iron Blood': ['kms', 'iron blood'],
  'Dragon Empery': ['pran', 'dragon empery'],
  'Northern Parliament': ['sn', 'northern parliament'],
  'Iris Libre': ['ffnf', 'iris libre'],
  'Vichya Domination': ['mnf', 'vichya domination'],
  'Sardenga Empire': ['rn', 'sardegna empire'],
  'Neptunia': ['hdn', 'neptunia'],
  'Bilibili': ['bili', 'bilibili'],
  'Venus Vacation': ['venus', 'venus vacation'],
  'Utawarerumono': ['utawarerumono'],
  'Kizuna AI': ['kizunaai', 'kizuna ai'],
  'Hololive': ['hololive'],
  'META': ['meta'],
  'Universal': ['universal', 'univ']
};

/**
 * The Main API class
 */
export default class API<T extends Identifiable> {
  raw: T[];
  fuse?: Fuse<T>;
  private client: AzurAPI;

  /**
   * Constructor
   * @param client AzurAPI instance
   * @param keys Arrays of keys to pass on to fuse
   */
  constructor(client: AzurAPI, keys?: string[]) {
    this.raw = [];
    if (keys) this.fuse = new Fuse<T>(this.raw, { keys: keys, threshold: 0.4 });
    this.client = client;
  }

  /**
   * Set the cache
   * @param raw Array
   */
  setData(raw: T[]) {
    if ((new Error()).stack!.match(/AzurAPI\.set/)) {
      this.raw.splice(0, this.raw.length, ...raw);
      if (this.fuse) this.fuse.setCollection(this.raw);
    }
  }

  /**
   * Search fuse cache
   * @param name Any
   */
  fuze(name: string): FuseResult<T>[] {
    if (!this.fuse) return [];
    return this.fuse.search(name, { limit: 10 }).sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  /**
   * Get by id
   * @param id String of number
   */
  id(id: string): T | undefined {
    for (let item of this.raw) if (normalize(item.id.toUpperCase()) === normalize(id.toUpperCase())) return item;
    return undefined;
  }

  /**
   * Get by any
   * @param query Any
   */
  get(query: string): T | undefined {
    return this.id(query) || this.fuze(query)?.map(s => s.item)[0];
  }

  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   */
  filter(predicate: (value: T, index: number, array: T[]) => unknown): T[] {
    return this.raw.filter(predicate);
  }

  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   */
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[] {
    return this.raw.map(callbackfn);
  }

  /**
   * Performs the specified action for each element in an array.
   * @param callbackfn A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
   */
  forEach(callbackfn: (value: T, index: number, array: T[]) => void): void {
    return this.raw.forEach(callbackfn);
  }

  /**
   * Determines whether all the members of an array satisfy the specified test
   * @param predicate A function that accepts up to three arguments. The every method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
   */
  every(predicate: (value: T, index: number, array: T[]) => unknown): boolean {
    return this.raw.every(predicate);
  }

  /**
   * Determines whether the specified callback function returns true for any element of an array.
   * @param predicate A function that accepts up to three arguments. The some method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value true, or until the end of the array.
   */
  some(predicate: (value: T, index: number, array: T[]) => unknown): boolean {
    return this.raw.some(predicate);
  }
}

const combining = /[\u0300-\u036F]/g;

/**
 * Normalize a string
 * @param string A string
 */
export function normalize(string) {
  return string.normalize('NFKD').replace(combining, '');
}
