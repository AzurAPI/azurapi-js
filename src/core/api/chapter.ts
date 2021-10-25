// api_chapters.ts
/**
 * Extended chapter api functions
 * @packageDocumentation
 */
import { Chapter } from '../../types/chapter';
import { fuse } from '../search/fuse';
import { FuseInstance, SharedAPI } from './shared';

export type ChaptersAPI = ReturnType<typeof createChaptersAPI>;
export const createChaptersAPI = (chapters: Chapter[]) => {
  const keys = ['names.en', 'names.cn', 'names.jp'];
  const fuze: FuseInstance<Chapter> = (query: string) => fuse(query, chapters, keys);
  const getName = SharedAPI.getByNames(chapters);

  /**
   * Get chapter by name
   * @param name Chapter name
   * @param languages Language to search
   */
  const name = getName.match;

  const { findAll, findItem } = SharedAPI.search(chapters, fuze);

  return { name, findAll, findItem };
};
