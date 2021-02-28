const { join } = require('path');

export const data = {
  version: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/version-info.json',
  ships: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json',
  equipments: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/equipments.json',
  chapters: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/chapters.json',
  voicelines: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/voice_lines.json',
  barrages: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/barrage.json'
};

export const local = {
  ships: join(__dirname, '..', '.azurlane', 'ship.json'),
  equipments: join(__dirname, '..', '.azurlane', 'equipment.json'),
  chapters: join(__dirname, '..', '.azurlane', 'chapters.json'),
  voicelines: join(__dirname, '..', '.azurlane', 'voice_lines.json'),
  barrages: join(__dirname, '..', '.azurlane', 'barrage.json')
};
export type datatype = 'ships' | 'equipments' | 'voicelines' | 'chapters' | 'barrages';
export let baseFolder = join(__dirname, '..', '.azurlane');
export let versionInfo = join(__dirname, '..', '.azurlane', 'version.json');

Object.freeze(local);
Object.freeze(data);
