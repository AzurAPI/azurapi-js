// Updater.ts
/**
 * Updater related stuff
 * @packageDocumentation
 */

//WARNING: NOT TESTED, IDK IF THIS WORKS OR NOT. I'M AN IDIOT.
import { HttpClient } from '@augu/orchid';
import UpdateError from '../errors/UpdateError';
import fs from 'fs/promises';

/**
 * Updater System to download/update AzurApi JSON files
 */
export default class Updater {
  private http: HttpClient;
  directory: string;
  approot: string;

  constructor(dir: string, approot?: string) {
    this.http = new HttpClient({
      defaults: {
        baseUrl: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master',
        headers: {
          'Accept': 'application/json'
        }
      }
    });

    this.directory = dir;
    this.approot = approot ? approot : process.cwd();

    (async() => {
      const shipsRaw = (await this.http.get('/ships.json')).text();
      const equipmentsRaw = (await this.http.get('/equipments.json')).text();
      const chaptersRaw = (await this.http.get('/chapters.json')).text();
      const voicelinesRaw = (await this.http.get('/voice_lines.json')).text();
      const barragesRaw = (await this.http.get('/barrage.json')).text();
      const versionInfoRaw = (await this.http.get('/version-info.json')).text();
      try {
        await fs.writeFile(`${this.directory}/ships.json`, shipsRaw);
        await fs.writeFile(`${this.directory}/equipments.json`, equipmentsRaw);
        await fs.writeFile(`${this.directory}/chapters.json`, chaptersRaw);
        await fs.writeFile(`${this.directory}/voice_lines.json`, voicelinesRaw);
        await fs.writeFile(`${this.directory}/barrage.json`, barragesRaw);
        await fs.writeFile(`${this.directory}/version-info.json`, versionInfoRaw);
        await this.saveDataDir(`${this.approot}/${this.directory}`);
      } catch (error) {
        throw new UpdateError();
      }
    });
  }
  /**
   * Fucntion to save the save data directory
   * @param directory - The data's directory folder
   */
  private async saveDataDir(directory: string) {
    return await fs.writeFile('../dat.json', directory.toString());
  }
}
