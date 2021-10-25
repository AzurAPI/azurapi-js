import { createSection, createStore } from '@atsu/taihou';
import { Barrage } from '../../types/barrage';
import { Chapter } from '../../types/chapter';
import { Equipment } from '../../types/equipment';
import { Ship } from '../../types/ship';
import { Voiceline } from '../../types/voiceline';

export type Datatype = keyof AzurAPIState;
export interface AzurAPIState {
  ships: Ship[];
  barrages: Barrage[];
  equipments: Equipment[];
  voicelines: Voiceline[];
  chapters: Chapter[];
}

export const initStore = () => {
  const { store } = createStore({
    azurApiSection: createSection<AzurAPIState, 'update', ''>({
      state: {
        ships: [],
        barrages: [],
        equipments: [],
        voicelines: [],
        chapters: [],
      },

      actions: {
        update: <T>(payload: { type: Datatype; value: T[] }, state) => ({ ...state, [payload.type]: payload.value }),
      },
    }),

    toolsSection: createSection({
      state: {
        version: {
          ships: { 'version-number': null },
          voicelines: { 'version-number': null },
          chapters: { 'version-number': null },
          barrages: { 'version-number': null },
          equipments: { 'version-number': null },
          'version-number': null,
        },
      },
      actions: {
        setVersion: (payload: VersionState) => ({ version: payload }),
      },
    }),
  });

  return store;
};

export type VersionState = {
  [key in Datatype]: DataVersion;
} & { 'version-number': number };
interface DataVersion {
  'version-number': number;
  'last-data-refresh-date'?: number;
  hash?: string;
}
