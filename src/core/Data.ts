// Data.ts
/**
 * Static data paths information
 * @packageDocumentation
 */
import { join } from 'path';

const baseDataUrl = 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master';

export type datatype = 'ships' | 'equipments' | 'voicelines' | 'chapters' | 'barrages';

type UrlType = datatype | 'version' | 'shipList' | 'idMap';

export const getDataUrl = (type: UrlType, options?: { internal?: boolean }) => {
  const internalString = options?.internal ? '.internal' : '';

  const urls: Record<UrlType, string> = {
    version: `${baseDataUrl}/dist/version${internalString}.json`,
    ships: `${baseDataUrl}/dist/ships${internalString}.json`,
    equipments: `${baseDataUrl}/dist/equipments${internalString}.json`,
    chapters: `${baseDataUrl}/dist/chapters${internalString}.min.json`,
    voicelines: `${baseDataUrl}/voice_lines${internalString}.json`,
    barrages: `${baseDataUrl}/dist/barrage${internalString}.json`,
    shipList: `${baseDataUrl}/dist/ship-list${internalString}.json`,
    idMap: `${baseDataUrl}/dist/id-map${internalString}.json`,
  };

  return urls[type];
};

export const local = {
  ships: join(__dirname, '..', '.azurlane', 'ship.json'),
  equipments: join(__dirname, '..', '.azurlane', 'equipment.json'),
  chapters: join(__dirname, '..', '.azurlane', 'chapters.json'),
  voicelines: join(__dirname, '..', '.azurlane', 'voice_lines.json'),
  barrages: join(__dirname, '..', '.azurlane', 'barrage.json'),
  shipList: join(__dirname, '..', '.azurlane', 'ship-list.json'),
  idMap: join(__dirname, '..', '.azurlane', 'id-map.json'),
};
export let baseFolder = join(__dirname, '..', '.azurlane');
export let versionInfo = join(__dirname, '..', '.azurlane', 'version.json');

Object.freeze(local);
