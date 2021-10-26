// Data.ts
/**
 * Static data paths information
 * @packageDocumentation
 */

export const ServerURL = 'https://raw.githubusercontent.com';
export const DatabaseURLs = {
  version: '/AzurAPI/azurapi-js-setup/master/dist/version.json',
  ships: '/AzurAPI/azurapi-js-setup/master/dist/ships.json',
  equipments: '/AzurAPI/azurapi-js-setup/master/dist/equipments.json',
  chapters: '/AzurAPI/azurapi-js-setup/master/dist/chapters.min.json',
  voicelines: '/AzurAPI/azurapi-js-setup/master/voice_lines.json',
  barrages: '/AzurAPI/azurapi-js-setup/master/dist/barrage.json',
  shipList: '/AzurAPI/azurapi-js-setup/master/dist/ship-list.json',
  idMap: '/AzurAPI/azurapi-js-setup/master/dist/id-map.json',
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
