// api_voiceline.ts
/**
 * Extended chapter api functions
 * @packageDocumentation
 */

import { Voiceline } from '../../types/voiceline';
import { searchAPI } from '../search';
import { fuse } from '../search/fuse';
import { FuseInstance, SharedAPI } from './shared';

export type VoicelinesAPI = ReturnType<typeof createVoicelinesAPI>;
export const createVoicelinesAPI = (voicelines: Voiceline[]) => {
  const keys = ['event', 'en', 'zh', 'jp', 'audio'];
  const fuze: FuseInstance<Voiceline> = (query: string) => fuse(query, voicelines, keys);

  const { findAll, findItem } = SharedAPI.search(voicelines, fuze);

  const id = searchAPI(voicelines).id;

  return { id, findAll, findItem };
};
