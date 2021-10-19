// api_equipment.ts
/**
 * Extended equipment api functions
 * @packageDocumentation
 */
import { Equipment } from '../../types/equipment';
import { searchAPI } from '../search';
import { fuse } from '../search/fuse';
import { AzurAPIState } from '../state';
import { FuseInstance, SharedAPI } from './shared';

export type EquipmentsAPI = ReturnType<typeof createEquipmentsAPI>;
/**
 * Special equipments class for extended functionality
 */
export const createEquipmentsAPI = ({ equipments }: AzurAPIState) => {
  const keys = ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code', 'id'];
  const fuze: FuseInstance<Equipment> = (query: string) => fuse(query, equipments.state.array, keys);
  const id = searchAPI(equipments.state.array).id;

  const getName = SharedAPI.getByNames(equipments.state.array);
  const getNationality = SharedAPI.getByNationality(equipments.state.array);

  /**
   * Get equipment by name
   * @param name Equipment name
   * @param languages Language to search
   */
  const name = getName.match;

  /**
   * Lists the equipments by category
   * @param category name of the category you want to search for
   */
  const category = (category: string): Equipment[] => {
    return equipments.state.array.filter(equip => SharedAPI.matchNormalized(equip.category, category));
  };

  /**
   * Lists the equipments by nationality
   * @param nationality naitionality name of the equipments you want to search for
   */
  const nationality = getNationality.matchFilter;

  const { findAll, findItem } = SharedAPI.search(equipments.state.array, fuze);

  return { name, category, nationality, id, get: findItem, all: findAll };
};
