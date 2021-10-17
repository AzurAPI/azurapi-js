import { Barrage } from '../../types/barrage';
import { Chapter } from '../../types/chapter';
import { Equipment } from '../../types/equipment';
import { Ship } from '../../types/ship';
import { DataSet, Dictionary } from '../../types/utils/dataSet';
import { Voiceline } from '../../types/voiceline';
import { DataSetUtils } from '../utils/dataset';
import { createSection, Section } from './stateManager';

export interface AzurAPIState {
  ships: Section<DataSet<Ship>>;
  barrage: Section<DataSet<Barrage>>;
  equipment: Section<DataSet<Equipment>>;
  voiceline: Section<DataSet<Voiceline>>;
  chapters: Section<DataSet<Chapter>>;
}

const defaultDataSet = <T>(): DataSet<T> => ({ dict: {}, array: [] });
export const createStateManager = (): AzurAPIState => ({
  ships: createSection({ state: defaultDataSet(), actions: { setShips: setDataSet } }),
  barrage: createSection({ state: defaultDataSet(), actions: { setBarrage: setDataSet } }),
  equipment: createSection({ state: defaultDataSet(), actions: { setEquipment: setDataSet } }),
  voiceline: createSection({
    state: defaultDataSet(),
    actions: {
      setVoiceline: (payload: Dictionary<Voiceline>, state) => {
        state.dict = payload;
        state.array = DataSetUtils.createArray(payload);
      },
    },
  }),
  chapters: createSection({ state: defaultDataSet(), actions: { setChapters: setDataSet } }),
});

const setDataSet = <P, S extends DataSet<P>>(payload: P[], state: S) => {
  state.array = payload;
  state.dict = DataSetUtils.createDictionary(payload, 'id');
};

export const createDispatcher = (state: AzurAPIState) => ({
  setShips: (ships: Ship[]) => state.ships.dispatch('setShips', ships),
  setBarrage: (barrage: Barrage[]) => state.ships.dispatch('setBarrage', barrage),
  setEquipment: (equipment: Equipment[]) => state.ships.dispatch('setEquipment', equipment),
  setVoiceline: (voiceline: Voiceline) => state.ships.dispatch('setVoiceline', voiceline),
  setChapters: (chapters: Chapter[]) => state.ships.dispatch('setChapters', chapters),
});
