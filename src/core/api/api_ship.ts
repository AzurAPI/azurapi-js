// api_ship.ts
/**
 * Extended ship api functions
 * @packageDocumentation
 */
import { Ship } from '../../types/ship';
import API, { Language, normalize, NATIONS, advancedOptions } from './api';
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
    super(client, ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code', 'id']);
  }

  /**
   * Get ship by name
   * @param name Ship name
   * @param languages Language to search
   */
  name(name: string, languages: Language[] = ['en', 'cn', 'jp', 'kr']): Ship | undefined {
    for (let ship of this.raw)
      if (
        languages.some(
          lang => ship.names[lang] && normalize(ship.names[lang].toUpperCase()) === normalize(name.toUpperCase())
        )
      )
        return ship;
    return undefined;
  }

  /**
   * Get ship by hull
   * @param hull Hull name
   */
  hull(hull: string): Ship[] {
    return this.raw.filter(
      ship =>
        (ship.hullType && normalize(ship.hullType.toUpperCase()) === normalize(hull.toUpperCase())) ||
        (ship.retrofitHullType && normalize(ship.retrofitHullType.toUpperCase()) === normalize(hull.toUpperCase()))
    );
  }

  /**
   * Get ship by nationality
   * @param nationality Nationality name
   */
  nationality(nationality: string): Ship[] {
    let results: Ship[] = [];
    nationality = Object.keys(NATIONS).find(key => NATIONS[key].includes(nationality.toLowerCase())) || nationality;
    for (let ship of this.raw)
      if (normalize(ship.nationality.toUpperCase()) === normalize(nationality.toUpperCase())) results.push(ship);
    return results;
  }

  private _nameAll(name: string, languages: Language[] = ['en', 'cn', 'jp', 'kr']): Ship[] {
    return this.raw.filter(ship =>
      languages.some(
        lang => ship.names[lang] && normalize(ship.names[lang].toUpperCase()) === normalize(name.toUpperCase())
      )
    );
  }

  /**
   * Get ship using name in any language or id
   * @param query Ship name in any language or ship id
   */
  get(query: string, adv?: advancedOptions): Ship | undefined {
    if (adv) {
      if (adv.idOnly) {
        return this.id(query);
      } else if (adv.nameOnly || (adv.nameOnly && !adv.language)) {
        return this.name(query);
      } else if (adv.nameOnly && adv.language) {
        return this.name(query, [adv.language]);
      }
    } else {
      let fuzeResult = this.fuze(query).sort((a, b) => (b.score || 0) - (a.score || 0))[0];
      return this.id(query) || this.name(query) || (fuzeResult ? fuzeResult.item : undefined);
    }
  }

  /**
   * Get ship using everything
   * @param query basically anyting i guess
   */
  all(query: string): Ship[] {
    let results: (Ship | undefined)[] = [];
    results.push(this.id(query));
    results.push(...this._nameAll(query).filter(i => i));
    results.push(...this.fuze(query).map(i => i.item));
    return results
      .filter((value: Ship | undefined): value is Ship => value !== null && value !== undefined)
      .filter((elem, index, self) => index === self.findIndex(el => el.id === elem.id));
  }
}
