import { Barrage } from '../../types/barrage';
import { Chapter } from '../../types/chapter';
import { Equipment } from '../../types/equipment';
import { Ship } from '../../types/ship';
import { DataSet } from '../../types/utils/dataSet';
import { Voiceline, VoicelineResponse } from '../../types/voiceline';
import { DataSetUtils } from '../utils/dataset';
import { createSection, Section } from './stateManager';

export type Datatype = keyof AzurAPIState;
export interface AzurAPIState {
  ships: Section<DataSet<Ship>>;
  barrages: Section<DataSet<Barrage>>;
  equipments: Section<DataSet<Equipment>>;
  voicelines: Section<DataSet<Voiceline>>;
  chapters: Section<DataSet<Chapter>>;
}

const setDataSet = <P, S extends DataSet<P>>(payload: P[], state: S) => {
  state.array = payload;
  state.dict = DataSetUtils.createDictionary(payload, 'id');
};

const defaultActions = () => ({ set: setDataSet });
const defaultDataSet = <T>(): DataSet<T> => ({ dict: {}, array: [] });
export const createStateManager = (): AzurAPIState => ({
  ships: createSection({ state: defaultDataSet(), actions: defaultActions() }),
  barrages: createSection({ state: defaultDataSet(), actions: defaultActions() }),
  equipments: createSection({ state: defaultDataSet(), actions: defaultActions() }),
  chapters: createSection({ state: defaultDataSet(), actions: defaultActions() }),
  voicelines: createSection({
    state: defaultDataSet(),
    actions: {
      set: (payload: VoicelineResponse, state) => {
        Object.keys(payload).forEach(id => {
          Object.keys(payload[id]).forEach(skin => {
            payload[id][skin].forEach((voiceline, index) => {
              const value: Voiceline = { id, skin, ...voiceline };
              state.dict[`${id}.${skin}.${index}`] = value;
              state.array.push(value);
            });
          });
        });
      },
    },
  }),
});

export type ClientStateDispatcher = ReturnType<typeof createDispatcher>;
export const createDispatcher = (state: AzurAPIState) => ({
  setShips: (ships: Ship[]) => state.ships.dispatch('set', ships),
  setBarrages: (barrages: Barrage[]) => state.barrages.dispatch('set', barrages),
  setEquipments: (equipments: Equipment[]) => state.equipments.dispatch('set', equipments),
  setVoicelines: (voicelines: VoicelineResponse) => state.voicelines.dispatch('set', voicelines),
  setChapters: (chapters: Chapter[]) => state.chapters.dispatch('set', chapters),
});
