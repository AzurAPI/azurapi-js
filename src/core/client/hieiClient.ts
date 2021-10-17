import { Hiei, HieiAPI } from '../api/hiei';
import { ClientFactoryProps, ClientOptions, createClientFactory } from './clientFactory';

interface HieiOptions {
  url: string;
  auth: string;
}

export interface HieiClientOptions extends ClientOptions {
  hiei: HieiOptions;
}

export interface CoreHieiAPI {
  ships: Hiei.ShipsAPI;
  equipments: Hiei.EquipmentsAPI;
  chapters: Hiei.ChaptersAPI;
  voicelines: Hiei.VoicelinesAPI;
  barrages: Hiei.BarragesAPI;
}

const defaultOptions: HieiClientOptions = {
  autoupdate: true,
  rate: 3600000,
  hiei: {
    auth: '',
    url: '',
  },
};

export const createHieiClient = (options: HieiClientOptions = defaultOptions) => {
  const clientOptions: ClientFactoryProps<HieiClientOptions, CoreHieiAPI> = {
    defaultOptions: options,
    api: getHieiAPI(options),
    beforeCreate: () => checkHiei(options),
  };

  return createClientFactory(clientOptions);
};

const checkHiei = ({ hiei: { url } }: HieiClientOptions): boolean => {
  if (!url) throw new Error('Option "hieiUrl" cannot be undefined when "source" is set to "hiei"');
  return !!url;
};

const getHieiAPI = (options: HieiClientOptions): CoreHieiAPI => {
  const hieiCoreApi = HieiAPI.createCoreHieiAPI(options);
  return {
    ships: HieiAPI.createShipsAPI(hieiCoreApi),
    equipments: HieiAPI.createEquipmentsAPI(hieiCoreApi),
    chapters: HieiAPI.createChaptersAPI(hieiCoreApi),
    voicelines: HieiAPI.createVoicelinesAPI(hieiCoreApi),
    barrages: HieiAPI.createBarragesAPI(hieiCoreApi),
  };
};
