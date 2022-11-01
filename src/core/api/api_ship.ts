// api_ship.ts
/**
 * Extended ship api functions
 * @packageDocumentation
 */
import { Ship } from '../../types/ship';
import API, { Language, normalize, NATIONS, advancedOptions, NATION_CODE_ABBRS } from './api';
import { AzurAPI } from '../Client';

/**
 * Special ships class for extended functionality
 */
export class Ships extends API<Ship> {
  /**
   * Constructor
   * @param client An AzurAPI instance
   */
  constructor(client: AzurAPI) {
    super(client, ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code']);
  }

  /**
   * Get by id
   * @param id String of number
   */
  id(id: string): Ship | undefined {
    this.queryIsString(id);
    for (let item of this.raw)
      if (normalize(item.id.toUpperCase()) === id.toUpperCase()) return item;
    return undefined;
  }
  /** Gets a ship by their Nationality + Name. This is to differentiate, for
   * example: `HMS Enterprise` and `USS Enterprise`.
   *
   * Refer to [the wiki](https://azurlane.koumakan.jp/wiki/Nations) for nation abbreviations.
   *
   * @param shipCode Generally the ship's ${nationality} ${name}
   * @example
   *  client.code('HMS Enterprise')
   * // –> {wikiUrl: "https://azurlane.koumakan.jp/wiki/Enterprise_(Royal_Navy)"...}
   */
  code(shipCode: string): Ship | undefined {
    const query = this.queryIsString(shipCode).toUpperCase();
    const isCode = NATION_CODE_ABBRS.includes(query.split(' ', 1)[0]);
    if (!isCode) {
      return undefined;
    }
    const ship = this.raw.find(({ names }) => {
      return normalize(names.code.toUpperCase()) === query;
    });
    if (ship === undefined) {
      return undefined;
    }
    return ship;
  }
  /**
   * Get ship by name
   * @param name Ship name
   * @param languages Language to search
   */
  name(name: string, languages: Language[] = ['en', 'cn', 'jp', 'kr']): Ship[] | [] {
    this.queryIsString(name);
    return this.raw.filter((ship) =>
      languages.some(
        (lang) =>
          ship.names[lang] && normalize(ship.names[lang].toUpperCase()) === name.toUpperCase()
      )
    );
  }

  /**
   * Get ship by hull
   * @param hull Hull name
   */
  hull(hull: string): Ship[] | [] {
    this.queryIsString(hull);
    return this.raw.filter(
      (ship) =>
        (ship.hullType && normalize(ship.hullType.toUpperCase()) === hull.toUpperCase()) ||
        (ship.retrofitHullType &&
          normalize(ship.retrofitHullType.toUpperCase()) === hull.toUpperCase())
    );
  }

  /**
   * Get ship by nationality
   * @param nationality Nationality name
   */
  nationality(nationality: string): Ship[] | [] {
    this.queryIsString(nationality);
    let results: Ship[] = [];
    nationality =
      Object.keys(NATIONS).find((key) => NATIONS[key].includes(nationality.toLowerCase())) ||
      nationality;
    for (let ship of this.raw)
      if (normalize(ship.nationality.toUpperCase()) === nationality.toUpperCase())
        results.push(ship);
    return results;
  }

  /**
   * Get ship using name in any language or id. Returns an array if an exact match isn't found.
   * @param query Ship name in any language or ship id
   */
  get(query: string): Ship[] {
    const isName = this.name(query);
    if (isName.length !== 0) {
      return isName;
    }
    const isCode = this.code(query);
    if (isCode) {
      return [isCode];
    }
    const isId = this.id(query);
    if (isId) {
      return [isId];
    }
    const fuzeResult = this.fuze(query).map((x) => x.item);
    return fuzeResult.length > 0 ? (fuzeResult as Ship[]) : [];
  }

  /**
   * Get ship using everything
   * @param query basically anyting i guess
   */
  all(query: string): Ship[] | [] {
    this.queryIsString(query);
    let results: (Ship | undefined)[] = [];
    results.push(this.id(query));
    results.push(...this.name(query).filter((i) => i));
    results.push(...this.fuze(query).map((i) => i.item));
    return results
      .filter((value: Ship | undefined): value is Ship => value !== null && value !== undefined)
      .filter((elem, index, self) => index === self.findIndex((el) => el.id === elem.id));
  }
  getShipIdByName(name: string, language = 'en') {
    return this.name(name)[0].id;
  }
  /**
   * Throws is query is `undefined` or an object or something – anything not a string.
   */
  private queryIsString(query: unknown): string {
    if (typeof query === 'string' && query.trim().length !== 0) {
      query = normalize(query);
      return normalize(query);
    }
    throw new Error('AzurAPI query string must be string');
  }
}
