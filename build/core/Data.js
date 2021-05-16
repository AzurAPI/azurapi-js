"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionInfo = exports.baseFolder = exports.local = exports.data = void 0;
// Data.ts
/**
 * Static data paths information
 * @packageDocumentation
 */
const { join } = require('path');
exports.data = {
    version: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/version-info.json',
    ships: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json',
    equipments: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/equipments.json',
    chapters: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/chapters.json',
    voicelines: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/voice_lines.json',
    barrages: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/barrage.json'
};
exports.local = {
    ships: join(__dirname, '..', '.azurlane', 'ship.json'),
    equipments: join(__dirname, '..', '.azurlane', 'equipment.json'),
    chapters: join(__dirname, '..', '.azurlane', 'chapters.json'),
    voicelines: join(__dirname, '..', '.azurlane', 'voice_lines.json'),
    barrages: join(__dirname, '..', '.azurlane', 'barrage.json')
};
exports.baseFolder = join(__dirname, '..', '.azurlane');
exports.versionInfo = join(__dirname, '..', '.azurlane', 'version.json');
Object.freeze(exports.local);
Object.freeze(exports.data);
//# sourceMappingURL=Data.js.map