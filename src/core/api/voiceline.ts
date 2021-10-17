// api_voiceline.ts
/**
 * Extended chapter api functions
 * @packageDocumentation
 */

import { Voiceline } from '../../types/voiceline';
import { advancedOptions } from '../search/definitions';
import { fuse } from '../search/fuse';
import { AzurAPIState } from '../state';
import { SharedAPI } from './shared';

export type VoicelinesAPI = ReturnType<typeof createVoicelinesAPI>;
export const createVoicelinesAPI = ({ voicelines }: AzurAPIState) => {
  const keys = ['event', 'en', 'zh', 'jp', 'audio'];
  const fuze = (query: string) => fuse<Voiceline>(query, voicelines.state.array, keys);

  /**
   * Get ship using name in any language or id
   * @param query Ship name in any language or ship id
   */
  const get = (query: string, adv?: advancedOptions): Voiceline | undefined =>
    SharedAPI.search(query, voicelines.state.array, fuze, adv);

  return { get };
};
