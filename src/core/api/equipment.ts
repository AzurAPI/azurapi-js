// api_equipment.ts
/**
 * Extended equipment api functions
 * @packageDocumentation
 */
import { Equipment } from '../../types/equipment';
import { searchAPI } from '../search';
import { advancedOptions, Language, NATIONS } from '../search/definitions';
import { fuse } from '../search/fuse';
import { AzurAPIState } from '../state';
import { SharedAPI } from './shared';

export type EquipmentsAPI = ReturnType<typeof createEquipmentsAPI>;
/**
 * Special equipments class for extended functionality
 */
export const createEquipmentsAPI = ({ equipments }: AzurAPIState) => {
  const keys = ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code', 'id'];
  const fuze = (query: string) => fuse<Equipment>(query, equipments.state.array, keys);
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

  /**
   * Get equipment using name in any language or id
   * @param query Equipment name in any language or equipment id
   */
  const get = (query: string, adv?: advancedOptions): Equipment | undefined =>
    SharedAPI.search(query, equipments.state.array, fuze, adv);

  /**
   * Get equipment using everything
   * @param query basically anyting i guess
   */
  const all = (query: string): Equipment[] => {
    let results: (Equipment | undefined)[] = [];
    results.push(id(query));
    results.push(...getName.matchAll(query).filter(i => i));
    results.push(...fuze(query).map(i => i.item));
    return results
      .filter((value: Equipment | undefined): value is Equipment => value !== null && value !== undefined)
      .filter((elem, index, self) => index === self.findIndex(el => el.id === elem.id));
  };

  return { name, category, nationality, get, all };
};
