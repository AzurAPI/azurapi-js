import { createShipsAPI, ShipsAPI } from '../api/ship';
import { createEquipmentsAPI, EquipmentsAPI } from '../api/equipment';
import { BarragesAPI, createBarragesAPI } from '../api/barrage';
import { ChaptersAPI, createChaptersAPI } from '../api/chapter';
import { createVoicelinesAPI, VoicelinesAPI } from '../api/voiceline';
import { AzurAPIState, createDispatcher, createStateManager } from '../state';
import { AzurAPIClient, createClientFactory, GeneratedClientProps } from './clientFactory';
import { getClientTools } from '../tools/toolsHandler';
import { ClientTools } from '../../types/client';

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

export interface LocalAzurAPIClient extends AzurAPIClient<Required<GeneratedClientProps>, CoreAPI> {
  state: AzurAPIState;
  dispatch: ReturnType<typeof createDispatcher>;
  tools?: ClientTools;
}

/**
 * Local client
 * @param props Configuration options
 */
export const createLocalClient = (options: GeneratedClientProps = {}): LocalAzurAPIClient => {
  const state: AzurAPIState = createStateManager();
  const dispatch = createDispatcher(state);
  const defaultOptions: Required<GeneratedClientProps> = {
    autoupdate: true,
    rate: 3600000,
    useTools: true,
    localPath: './',
    customToolsImpl: undefined,
  };

  const clientOptions = {
    defaultOptions,
    api: getLocalAPI(state),
  };

  const azurApiClient = createClientFactory<Required<GeneratedClientProps>, CoreAPI>(clientOptions)(options);
  if (azurApiClient.options.useTools) {
    const tools = getClientTools({ state, options: azurApiClient.options }, azurApiClient.options.customToolsImpl);
    return { ...azurApiClient, state, dispatch, tools };
  }
  return { ...azurApiClient, state, dispatch };
};
