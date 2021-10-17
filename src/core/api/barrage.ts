// api_barrage.ts
/**
 * Extended barrage api functions
 * @packageDocumentation
 */

import { Barrage, Hull, Ships } from '../../types/barrage';
import { fuse } from '../search/fuse';
import { AzurAPIState } from '../state';
import { SharedAPI } from './shared';

export type BarragesAPI = ReturnType<typeof createBarragesAPI>;
/**
 * Special barrage class for extended functionality
 */

export const createBarragesAPI = ({ barrage }: AzurAPIState) => {
  const keys = ['id', 'name'];
  const fuze = (query: string) => fuse<Barrage>(query, barrage.state.array, keys);
  const getGeneric = SharedAPI.getGeneric(barrage.state.array);

  /**
   * Get barrage by name
   * @param name Barrage name
   */
  const name = (name: string) => getGeneric.match(name, 'name');

  /**
   * Get barrage by type
   * @param type Barrage type
   */
  const type = (type: 'ship' | 'class' | 'skill'): Barrage[] => getGeneric.matchAll(type, 'type');

  /**
   * Get barrage by hull type
   * @param hull Hull type
   */
  const hull = (hull: Hull): Barrage[] => getGeneric.matchAll(hull, 'hull');

  /**
   * Sort barrages by compatible ship
   * @param ship A ship name
   */
  const ships = (ship: Ships): Barrage[] =>
    barrage.state.array.filter(barrage => barrage.ships.map(bShip => SharedAPI.matchNormalized(ship, bShip)));

  return { name, type, hull, ships };
};
