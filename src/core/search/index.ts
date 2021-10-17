import { Identifiable } from '../../types/identifiable';
import { SharedAPI } from '../api/shared';
import { fuse } from './fuse';

export interface SearchAPI<T> {
  id: (id: string) => T | undefined;
  get: (query: string) => T | undefined;
}

/**
 * The Main Local API
 */
export const searchAPI = <T extends Identifiable>(collection: T[], keys: string[] = []): SearchAPI<T> => {
  /**
   * Get by id
   * @param id String of number
   */
  const id = (id: string): T | undefined => {
    return collection.find(item => SharedAPI.matchNormalized(id, item.id));
  };

  /**
   * Get by any
   * @param query Any
   */
  const get = (query: string): T | undefined => {
    return id(query) || fuse<T>(query, collection, keys)?.map(s => s.item)[0];
  };

  return { id, get };
};
