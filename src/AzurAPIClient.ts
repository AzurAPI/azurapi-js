import { EventEmitter } from 'events';
import APIFetcher from './core/APIFetcher';
import { join } from 'path';
//import Updater from './core/Updater';

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
   * Creates a new [AzurAPIClient] instance
   * @param directory The directory to host the database, defaults to `$CURRENT/.azurapi`
   */
  constructor(directory?: string) {
    super();

    this.fetcher = new APIFetcher();
    //this.updater = new Updater(directory || join(process.cwd(), '.azurapi'));
  }

  /**
   * Gets the ship by it's query
   * @param query The query (id or name)
   */
  getShip(query: string) {
    return this.fetcher.getShip(query);
  }
}
