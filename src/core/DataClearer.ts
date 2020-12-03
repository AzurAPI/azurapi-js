// DataClearer.ts
/**
 * Clear local data
 * @packageDocumentation
 */

import ClearDataError from '../errors/ClearDataError';
const fs = require('fs/promises');

export default class DataClearer {
  directory: string;

  constructor(dir: string) {
    this.directory = dir;

    (async() => {
      try {
        await fs.writeFile(`${dir}/ships.json`, JSON.stringify({}));
        await fs.writeFile(`${dir}/equipments.json`, JSON.stringify({}));
        await fs.writeFile(`${dir}/chapters.json`, JSON.stringify({}));
        await fs.writeFile(`${dir}/voice_lines.json`, JSON.stringify({}));
        await fs.writeFile(`${dir}/barrage.json`, JSON.stringify({}));
        await fs.writeFile(`${dir}/version-info.json`, JSON.stringify({}));
      } catch (error) {
        throw new ClearDataError();
      }
    });
  }
}
