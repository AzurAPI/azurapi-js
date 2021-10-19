// api_barrage.ts
/**
 * Extended barrage api functions
 * @packageDocumentation
 */

import { Barrage, Hull, Ships } from '../../types/barrage';
import { fuse } from '../search/fuse';
import { AzurAPIState } from '../state';
import { FuseInstance, SharedAPI } from './shared';

export type BarragesAPI = ReturnType<typeof createBarragesAPI>;
/**
 * Special barrage class for extended functionality
 */

export const createBarragesAPI = ({ barrages }: AzurAPIState) => {
  const keys = ['id', 'name'];
  const fuze: FuseInstance<Barrage> = (query: string) => fuse(query, barrages.state.array, keys);
  const getGeneric = SharedAPI.getGeneric(barrages.state.array);

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
    barrages.state.array.filter(barrage => barrage.ships.map(bShip => SharedAPI.matchNormalized(ship, bShip)));

  const { findAll, findItem } = SharedAPI.search(barrages.state.array, fuze);

  return { name, type, hull, ships, findAll, findItem };
};
