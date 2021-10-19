// api_voiceline.ts
/**
 * Extended chapter api functions
 * @packageDocumentation
 */

import { Voiceline } from '../../types/voiceline';
import { searchAPI } from '../search';
import { fuse } from '../search/fuse';
import { AzurAPIState } from '../state';
import { FuseInstance, SharedAPI } from './shared';

export type VoicelinesAPI = ReturnType<typeof createVoicelinesAPI>;
export const createVoicelinesAPI = ({ voicelines }: AzurAPIState) => {
  const keys = ['event', 'en', 'zh', 'jp', 'audio'];
  const fuze: FuseInstance<Voiceline> = (query: string) => fuse(query, voicelines.state.array, keys);

  const { findAll, findItem } = SharedAPI.search(voicelines.state.array, fuze);

  const id = searchAPI(voicelines.state.array).id;

  return { id, findAll, findItem };
};
