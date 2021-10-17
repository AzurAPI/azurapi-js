import { Barrage } from '../../types/barrage';
import { Chapter } from '../../types/chapter';
import { Equipment } from '../../types/equipment';
import { Ship } from '../../types/ship';
import { DataSet, Dictionary } from '../../types/utils/dataSet';
import { Voiceline } from '../../types/voiceline';
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

const defaultActions = <T>() => ({ set: setDataSet });
const defaultDataSet = <T>(): DataSet<T> => ({ dict: {}, array: [] });
export const createStateManager = (): AzurAPIState => ({
  ships: createSection({ state: defaultDataSet(), actions: defaultActions() }),
  barrages: createSection({ state: defaultDataSet(), actions: defaultActions() }),
  equipments: createSection({ state: defaultDataSet(), actions: defaultActions() }),
  chapters: createSection({ state: defaultDataSet(), actions: defaultActions() }),
  voicelines: createSection({
    state: defaultDataSet(),
    actions: {
      set: (payload: Dictionary<Voiceline>, state) => {
        state.dict = payload;
        state.array = DataSetUtils.createArray(payload);
      },
    },
  }),
});

export type ClientStateDispatcher = ReturnType<typeof createDispatcher>;
export const createDispatcher = (state: AzurAPIState) => ({
  setShips: (ships: Ship[]) => state.ships.dispatch('set', ships),
  setBarrages: (barrage: Barrage[]) => state.ships.dispatch('set', barrage),
  setEquipments: (equipment: Equipment[]) => state.ships.dispatch('set', equipment),
  setVoicelines: (voiceline: Voiceline) => state.ships.dispatch('set', voiceline),
  setChapters: (chapters: Chapter[]) => state.ships.dispatch('set', chapters),
});
