// Data.ts
/**
 * Static data paths information
 * @packageDocumentation
 */
import { join } from 'path';

export const data = {
  version: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/version.json',
  ships: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/ships.json',
  equipments:
    'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/equipments.json',
  chapters:
    'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/chapters.min.json',
  voicelines: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/voice_lines.json',
  barrages: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/barrage.json',
  shipList: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/ship-list.json',
  idMap: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/id-map.json',
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
export type datatype = 'ships' | 'equipments' | 'voicelines' | 'chapters' | 'barrages';
export let baseFolder = join(__dirname, '..', '.azurlane');
export let versionInfo = join(__dirname, '..', '.azurlane', 'version.json');

Object.freeze(local);
Object.freeze(data);
