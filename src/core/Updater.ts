//WARNING: NOT TESTED, IDK IF THIS WORKS OR NOT. I'M AN IDIOT.
import APIFetcher from './APIFetcher';
import UpdateError from '../errors/UpdateError';
const fs = require('fs').promises;

export default class Updater {
  private fetcher: APIFetcher;
  directory: string;

  constructor(dir: string) {
    this.fetcher = new APIFetcher();
    this.directory = dir;

    const shipsRaw = this.fetcher.getDataShips();
    const equipmentsRaw = this.fetcher.getDataEquipments();
    const chaptersRaw = this.fetcher.getDataChapters();
    const voicelinesRaw = this.fetcher.getDataVoicelines();
    const barragesRaw = this.fetcher.getDataBarrage();
    (async() => {
      try {
        await fs.writeFile(`${dir}/ships.json`, shipsRaw);
        await fs.writeFile(`${dir}/equipments.json`, equipmentsRaw);
        await fs.writeFile(`${dir}/chapters.json`, chaptersRaw);
        await fs.writeFile(`${dir}/voice_lines.json`, voicelinesRaw);
        await fs.writeFile(`${dir}/barrage.json`, barragesRaw);
      } catch (error) {
        throw new UpdateError();
      }
    });
  }
}
