// api_ship.ts
/**
 * Extended ship api functions
 * @packageDocumentation
 */
import { Ship } from '../../types/ship';
import { searchAPI } from '../search';
import { fuse } from '../search/fuse';
import { normalize } from '../search/normalize';
import { FuseInstance, SharedAPI } from './shared';

export type ShipsAPI = ReturnType<typeof createShipsAPI>;
/**
 * Special ships class for extended functionality
 */
export const createShipsAPI = (ships: Ship[]) => {
  const keys = ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code', 'id'];
  const fuze: FuseInstance<Ship> = (query: string) => fuse(query, ships, keys);
  const id = searchAPI(ships).id;

  const getName = SharedAPI.getByNames(ships);
  const getNationality = SharedAPI.getByNationality(ships);

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
    return ships.filter(
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

  const { findAll, findItem } = SharedAPI.search(ships, fuze);

  return { name, hull, nationality, id, findAll, findItem };
};

export const ShipsAPI = { createShipsAPI };
