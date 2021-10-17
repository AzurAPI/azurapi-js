// api_ship.ts
/**
 * Extended ship api functions
 * @packageDocumentation
 */
import { Ship } from '../../types/ship';
import { searchAPI } from '../search';
import { advancedOptions } from '../search/definitions';
import { fuse } from '../search/fuse';
import { normalize } from '../search/normalize';
import { AzurAPIState } from '../state';
import { SharedAPI } from './shared';

export type ShipsAPI = ReturnType<typeof createShipsAPI>;
/**
 * Special ships class for extended functionality
 */
export const createShipsAPI = ({ ships }: AzurAPIState) => {
  const keys = ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code', 'id'];
  const fuze = (query: string) => fuse<Ship>(query, ships.state.array, keys);
  const id = searchAPI(ships.state.array).id;

  const getName = SharedAPI.getByNames(ships.state.array);
  const getNationality = SharedAPI.getByNationality(ships.state.array);

  /**
   * Get ship by name
   * @param name Ship name
   * @param languages Language to search
   */
  const name = getName.match;

  /**
   * Get ship by hull
   * @param hull Hull name
   */
  const hull = (hull: string): Ship[] => {
    return ships.state.array.filter(
      ship =>
        (ship.hullType && normalize(ship.hullType.toUpperCase()) === normalize(hull.toUpperCase())) ||
        (ship.retrofitHullType && normalize(ship.retrofitHullType.toUpperCase()) === normalize(hull.toUpperCase()))
    );
  };

  /**
   * Get ship by nationality
   * @param nationality Nationality name
   */
  const nationality = getNationality.matchFilter;

  /**
   * Get ship using name in any language or id
   * @param query Ship name in any language or ship id
   */
  const get = (query: string, adv?: advancedOptions): Ship | undefined =>
    SharedAPI.search(query, ships.state.array, fuze, adv);

  /**
   * Get ship using everything
   * @param query basically anyting i guess
   */
  const all = (query: string): Ship[] => {
    let results: (Ship | undefined)[] = [];
    results.push(id(query));
    results.push(...getName.matchAll(query).filter(i => i));
    results.push(...fuze(query).map(i => i.item));
    return results
      .filter((value: Ship | undefined): value is Ship => value !== null && value !== undefined)
      .filter((elem, index, self) => index === self.findIndex(el => el.id === elem.id));
  };

  return { name, hull, nationality, get, all };
};

export const ShipsAPI = { createShipsAPI };
