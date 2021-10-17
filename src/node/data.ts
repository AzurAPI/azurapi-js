import { join } from 'path';
import { AzurAPIState } from '../core/state';

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
