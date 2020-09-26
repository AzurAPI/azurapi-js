import APIFetcher, { Nationality } from './core/APIFetcher';
import { EventEmitter } from 'events';
import { merge } from './util/merge';
import { join } from 'path';
//import Updater from './core/Updater';

interface NulledClientOptions {
  directory?: string;
  update?: number | boolean;
}

interface NonNulledClientOptions {
  directory: string;
  update: number | boolean;
}

export class AzurAPIClient extends EventEmitter {
  /**
   * The API fetcher to grab items from the database
   */
  private fetcher: APIFetcher;

  /**
   * The updater to update the local database
   */
  //private updater: Updater;

  /**
   * The options the user has set
   */
  public options: NonNulledClientOptions;

  /**
   * Creates a new [AzurAPIClient] instance
   * @param directory The directory to host the database, defaults to `$CURRENT/.azurapi`
   */
  constructor(options?: NulledClientOptions) {
    super();

    this.fetcher = new APIFetcher();
    //this.updater = new Updater(directory || join(process.cwd(), '.azurapi'));
    this.options = merge<any, NonNulledClientOptions>(options, {
      directory: join(process.cwd(), '.azurapi'),
      update: false
    });

    // Add backwards compatibility (readonly variable since this is outside of the constructor's scope)
    const backwards: Readonly<string[]> = [
      'getShipByEnglishName', 
      'getShipsByChineseName', 
      'getShipsById',
      'getShipsByKoreanName'
    ] as const;

    for (let i = 0; i < backwards.length; i++) {
      const method = backwards[i];
      this[method] = function (this: AzurAPIClient, query: string) {
        return this.getShip(query);
      };
    }
  }

  /**
   * Returns a list of ships available
   */
  getShips() {
    return this.fetcher.getShips();
  }

  /**
   * Gets the ship by it's query
   * @param query The query (id or name)
   */
  getShip(query: string) {
    return this.fetcher.getShip(query);
  }

  /**
   * Gets the ship by the faction
   * @param query The query to find the ship
   */
  getShipsByFaction(faction: Nationality) {
    return this.fetcher.getShipsFromFaction(faction);
  }
}
