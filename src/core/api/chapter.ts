// api_chapters.ts
/**
 * Extended chapter api functions
 * @packageDocumentation
 */
import { AzurAPIState } from '../state';
import { SharedAPI } from './shared';

export type ChaptersAPI = ReturnType<typeof createChaptersAPI>;
export const createChaptersAPI = ({ chapters }: AzurAPIState) => {
  const getName = SharedAPI.getByNames(chapters.state.array);

  /**
   * Get chapter by name
   * @param name Chapter name
   * @param languages Language to search
   */
  const name = getName.match;

  return { name };
};
