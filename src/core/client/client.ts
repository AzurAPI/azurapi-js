import { createShipsAPI, ShipsAPI } from '../api/ship';
import { createEquipmentsAPI, EquipmentsAPI } from '../api/equipment';
import { BarragesAPI, createBarragesAPI } from '../api/barrage';
import { ChaptersAPI, createChaptersAPI } from '../api/chapter';
import { createVoicelinesAPI, VoicelinesAPI } from '../api/voiceline';
import { AzurAPIState, initStore } from '../state';
import { ClientTools } from '../../types/client';
import { createUpdater } from '../tools/updater';
import { Client, CreateClientProps } from '../../types/client/client';
import { getClientTools } from '../tools/toolsHandler';
import { createVersionHandler } from '../tools/versionHandler';

export interface CoreAPI {
  ships: ShipsAPI;
  equipments: EquipmentsAPI;
  chapters: ChaptersAPI;
  voicelines: VoicelinesAPI;
  barrages: BarragesAPI;
}

const getLocalAPI = (state: AzurAPIState): CoreAPI => ({
  ships: createShipsAPI(state.ships),
  equipments: createEquipmentsAPI(state.equipments),
  chapters: createChaptersAPI(state.chapters),
  voicelines: createVoicelinesAPI(state.voicelines),
  barrages: createBarragesAPI(state.barrages),
});

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
export const createLocalClient = (
  props: Partial<CreateClientProps> = {}
): Client<CreateClientProps, CoreAPI, AzurAPIState> => {
  const options: CreateClientProps = { ...defaultOptions, ...props };
  const store = initStore();

  const azurApiClient: Client<CreateClientProps, CoreAPI, AzurAPIState> = {
    options,
    api: getLocalAPI(store.azurApiSection.state),
    state: store.azurApiSection.state,
  };

  if (azurApiClient.options.useTools) {
    const tools: ClientTools = getClientTools(options.customToolsImpl);

    const versionHandler = createVersionHandler({
      ...tools,
      version: store.toolsSection.state.version,
      onUpdate: version => store.toolsSection.commit('setVersion', version),
    });

    const updater = createUpdater({
      ...tools,
      versionHandler,
      options,
      onUpdate: (type, value) => store.azurApiSection.commit('update', { type, value }),
    });

    azurApiClient.tools = tools;
    azurApiClient.modules = { versionHandler, updater };
  }

  return azurApiClient;
};
