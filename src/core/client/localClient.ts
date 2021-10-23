import { createShipsAPI, ShipsAPI } from '../api/ship';
import { createEquipmentsAPI, EquipmentsAPI } from '../api/equipment';
import { BarragesAPI, createBarragesAPI } from '../api/barrage';
import { ChaptersAPI, createChaptersAPI } from '../api/chapter';
import { createVoicelinesAPI, VoicelinesAPI } from '../api/voiceline';
import { AzurAPIState, createDispatcher, createStateManager } from '../state';
import { ClientTools } from '../../types/client';
import { createUpdater } from '../tools/updater';
import { Client, CreateClientProps } from '../../types/client/client';
import { getClientTools } from '../tools/toolsHandler';

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

export interface LocalAzurAPIClient extends Client<CreateClientProps, CoreAPI> {
  state: AzurAPIState;
  dispatch: ReturnType<typeof createDispatcher>;
  tools?: ClientTools;
}

const defaultOptions: CreateClientProps = {
  autoupdate: true,
  rate: 3600000,
  useTools: true,
  localPath: './',
  customToolsImpl: undefined,
};

/**
 * Local client
 * @param props Configuration options
 */
export const createLocalClient = (props: Partial<CreateClientProps> = {}): LocalAzurAPIClient => {
  const options: CreateClientProps = { ...defaultOptions, ...props };
  const state: AzurAPIState = createStateManager();
  const dispatch = createDispatcher(state);

  const azurApiClient: LocalAzurAPIClient = {
    options,
    api: getLocalAPI(state),
    state,
    dispatch,
  };

  if (azurApiClient.options.useTools) {
    const tools: ClientTools = getClientTools(options.customToolsImpl);
    tools.updater = createUpdater({ tools, state, options });
    azurApiClient.tools = tools;
  }

  return azurApiClient;
};
