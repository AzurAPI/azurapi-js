import { createShipsAPI, ShipsAPI } from '../api/ship';
import { createEquipmentsAPI, EquipmentsAPI } from '../api/equipment';
import { BarragesAPI, createBarragesAPI } from '../api/barrage';
import { ChaptersAPI, createChaptersAPI } from '../api/chapter';
import { createVoicelinesAPI, VoicelinesAPI } from '../api/voiceline';
import { AzurAPIState, createDispatcher, createStateManager } from '../state';
import {
  AzurAPIClient,
  ClientFactoryProps,
  ClientOptions,
  createClientFactory,
  GeneratedClientProps,
} from './clientFactory';

export interface CoreAPI {
  ships: ShipsAPI;
  equipments: EquipmentsAPI;
  chapters: ChaptersAPI;
  voicelines: VoicelinesAPI;
  barrages: BarragesAPI;
}

const getLocalAPI = (state: AzurAPIState): CoreAPI => ({
  ships: createShipsAPI(state),
  equipments: createEquipmentsAPI(state),
  chapters: createChaptersAPI(state),
  voicelines: createVoicelinesAPI(state),
  barrages: createBarragesAPI(state),
});

export interface LocalAzurAPIClient extends AzurAPIClient<ClientOptions, CoreAPI> {
  state: AzurAPIState;
  dispatch: ReturnType<typeof createDispatcher>;
}

/**
 * Local client
 * @param props Configuration options
 */
export const createClient = (options: GeneratedClientProps): LocalAzurAPIClient => {
  const state: AzurAPIState = createStateManager();
  const dispatch = createDispatcher(state);
  const defaultOptions: ClientOptions = {
    autoupdate: true,
    rate: 3600000,
  };

  const clientOptions: ClientFactoryProps<ClientOptions, CoreAPI> = { defaultOptions, api: getLocalAPI(state) };

  const azurApiClient = createClientFactory<ClientOptions, CoreAPI>(clientOptions)(options);
  return { ...azurApiClient, state, dispatch };
};
