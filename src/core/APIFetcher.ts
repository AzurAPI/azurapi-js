import UnserialisedError from '../errors/UnserialisableError';
import UnknownShipError from '../errors/UnknownShipError';
import { HttpClient } from '@augu/orchid';

/**
 * Fetcher to grab anything from the database on GitHub
 */
export default class APIFetcher {
  /**
   * The client to use to request
   */
  private http: HttpClient;

  /**
   * Creates a new [APIFetcher] instance
   */
  constructor() {
    this.http = new HttpClient({
      defaults: {
        baseUrl: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master',
        headers: {
          'Accept': 'application/json'
        }
      }
    });
  }

  /**
   * Grabs a ship from the database
   * @param id The ship's ID or name
   */
  async getShip(id: string) {
    const res = await this.http.get('/ships.json');
    let data: any[] = [];

    try {
      data = res.json();
    } catch(ex) {
      throw new UnserialisedError();
    }

    const ships = data.filter(ship => {
      if (ship.id === id) return true;
      for (const key of Object.keys(ship.names)) {
        if (ship.names[key] === id) return true;
      }

      return false;
    });

    if (!ships.length) throw new UnknownShipError(id);

    return ships[0];
  }
}
