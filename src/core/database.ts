// Data.ts
/**
 * Static data paths information
 * @packageDocumentation
 */

export const DatabaseURLs = {
  version: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/version.json',
  ships: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/ships.json',
  equipments: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/equipments.json',
  chapters: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/chapters.min.json',
  voicelines: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/voice_lines.json',
  barrages: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/barrage.json',
  shipList: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/ship-list.json',
  idMap: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/id-map.json',
};

Object.freeze(DatabaseURLs);

export type LocalFiles = ReturnType<typeof getLocalDatabase>;

export const getLocalDatabase = (path: string = './') => {
  const baseFolder = path + '.azurlane/';
  const localDatabaseFiles = {
    ships: baseFolder + 'ship.json',
    equipments: baseFolder + 'equipment.json',
    chapters: baseFolder + 'chapters.json',
    voicelines: baseFolder + 'voice_lines.json',
    barrages: baseFolder + 'barrage.json',
    shipList: baseFolder + 'ship-list.json',
    idMap: baseFolder + 'id-map.json',
  };

  const versionInfoFile = baseFolder + 'version.json';

  return { localDatabaseFiles, baseFolder, versionInfoFile };
};
