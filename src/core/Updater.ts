//WARNING: NOT TESTED, IDK IF THIS WORKS OR NOT. I'M AN IDIOT.
import { HttpClient } from '@augu/orchid';
import UpdateError from '../errors/UpdateError';
import fs from 'fs/promises';

export default class Updater {
  private http: HttpClient;
  directory: string;

  constructor(dir: string) {
    this.http = new HttpClient({
      defaults: {
        baseUrl: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master',
        headers: {
          'Accept': 'application/json'
        }
      }
    });

    this.directory = dir;

    (async() => {
      const shipsRaw = (await this.http.get('/ships.json')).text();
      const equipmentsRaw = (await this.http.get('/equipments.json')).text();
      const chaptersRaw = (await this.http.get('/chapters.json')).text();
      const voicelinesRaw = (await this.http.get('/voice_lines.json')).text();
      const barragesRaw = (await this.http.get('/barrage.json')).text();
      const versionInfoRaw = (await this.http.get('/version-info.json')).text();
      try {
        await fs.writeFile(`${dir}/ships.json`, shipsRaw);
        await fs.writeFile(`${dir}/equipments.json`, equipmentsRaw);
        await fs.writeFile(`${dir}/chapters.json`, chaptersRaw);
        await fs.writeFile(`${dir}/voice_lines.json`, voicelinesRaw);
        await fs.writeFile(`${dir}/barrage.json`, barragesRaw);
        await fs.writeFile(`${dir}/version-info.json`, versionInfoRaw);
      } catch (error) {
        throw new UpdateError();
      }
    });
  }
}
