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
    super(client, [
      'names.en',
      'names.cn',
      'names.jp',
      'names.kr',
      'names.code',
      'id',
    ]);
  }

  /**
   * Get by id
   * @param id String of number
   */
  id(id: string): Ship | undefined {
    for (let item of this.raw)
      if (normalize(item.id.toUpperCase()) === normalize(id.toUpperCase()))
        return item;
    return undefined;
  }

  /**
   * Get ship by name
   * @param name Ship name
   * @param languages Language to search
   */
  name(
    name: string,
    languages: Language[] = ['en', 'cn', 'jp', 'kr']
  ): Ship[] | [] {
    return this.raw.filter((ship) =>
      languages.some(
        (lang) =>
          ship.names[lang] &&
          normalize(ship.names[lang].toUpperCase()) ===
            normalize(name.toUpperCase())
      )
    );
  }

  /**
   * Get ship by hull
   * @param hull Hull name
   */
  hull(hull: string): Ship[] | [] {
    return this.raw.filter(
      (ship) =>
        (ship.hullType &&
          normalize(ship.hullType.toUpperCase()) ===
            normalize(hull.toUpperCase())) ||
        (ship.retrofitHullType &&
          normalize(ship.retrofitHullType.toUpperCase()) ===
            normalize(hull.toUpperCase()))
    );
  }

  /**
   * Get ship by nationality
   * @param nationality Nationality name
   */
  nationality(nationality: string): Ship[] | [] {
    let results: Ship[] = [];
    nationality =
      Object.keys(NATIONS).find((key) =>
        NATIONS[key].includes(nationality.toLowerCase())
      ) || nationality;
    for (let ship of this.raw)
      if (
        normalize(ship.nationality.toUpperCase()) ===
        normalize(nationality.toUpperCase())
      )
        results.push(ship);
    return results;
  }

  /**
   * Get ship using name in any language or id
   * @param query Ship name in any language or ship id
   */
  get(query: string): Ship | Ship[] {
    let fuzeResult = this.fuze(query).sort(
      (a, b) => (b.score || 0) - (a.score || 0)
    )[0];
    return (
      this.id(query) ||
      this.name(query)[0] ||
      (fuzeResult ? fuzeResult.item : undefined)
    );
  }

  /**
   * Get ship using everything
   * @param query basically anyting i guess
   */
  all(query: string): Ship[] | [] {
    let results: (Ship | undefined)[] = [];
    results.push(this.id(query));
    results.push(...this.name(query).filter((i) => i));
    results.push(...this.fuze(query).map((i) => i.item));
    return results
      .filter(
        (value: Ship | undefined): value is Ship =>
          value !== null && value !== undefined
      )
      .filter(
        (elem, index, self) =>
          index === self.findIndex((el) => el.id === elem.id)
      );
  }
  getShipIdByName(name: string, language = 'en') {
    return this.name(name)[0].id;
  }

}

