import { join } from 'path';

export const localDatabase = {
  ships: join(__dirname, '..', '.azurlane', 'ship.json'),
  equipments: join(__dirname, '..', '.azurlane', 'equipment.json'),
  chapters: join(__dirname, '..', '.azurlane', 'chapters.json'),
  voicelines: join(__dirname, '..', '.azurlane', 'voice_lines.json'),
  barrages: join(__dirname, '..', '.azurlane', 'barrage.json'),
  shipList: join(__dirname, '..', '.azurlane', 'ship-list.json'),
  idMap: join(__dirname, '..', '.azurlane', 'id-map.json'),
};

export let baseFolder = join(__dirname, '..', '.azurlane');
export let versionInfoFile = join(__dirname, '..', '.azurlane', 'version.json');

export enum Events {
  debug = 'debug',
  updateAvailable = 'updateAvailable',
  ready = 'ready',
}

Object.freeze(localDatabase);
