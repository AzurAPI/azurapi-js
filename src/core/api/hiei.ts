// hiei.ts
/**
 * Hiei api function
 * @packageDocumentation
 */

import { AzurAPI } from '../../Client';
import { URL, URLSearchParams } from 'url';
import http from 'http';

const endpoint = {
  ship: {
    search: '/ship/search',
    random: '/ship/random',
    id: '/ship/id',
    rarity: '/ship/rarity',
    hullType: '/ship/hullType',
    shipClass: '/ship/shipClass',
    nationality: '/ship/nationality'
  },
  equipment: {
    search: '/equip/search',
    random: '/equip/random',
    nationality: '/equip/nationality',
    category: '/equip/category'
  },
  barrage: {
    name: '/barrage/searchBarrageByName',
    ship: '/barrage/searchBarrageByShip'
  },
  event: {
    search: '/event/search'
  },
  chapter: {
    code: '/chapter/code',
    search: '/chapter/search'
  },
  voice: {
    id: '/voice/id'
  }
};

/**
 * The Hiei API class
 */
export class HieiAPI {
  private client: AzurAPI;

  /**
   * Constructor
   * @param client AzurAPI instance
   */
  constructor(client) {
    this.client = client;
  }

  _fetch(endpoint: string, q: string) {
    const url = new URL(endpoint, this.client.options.hieiUrl);
    url.search = new URLSearchParams({ q }).toString();
    http.get(url.toString(), { headers: { 'authorization': this.client.options.hieiAuth }}, (res) => {
      let error: Error | undefined;
      if (res.statusCode !== 200) {
        error = new Error(`Request Failed with Status Code: ${res.statusCode}`);
      } else if (!/^application\/json/.test(res.headers['content-type'] ? res.headers['content-type'] : '')) {
        error = new Error(`Invalid content-type. Expeceted "application/json" but received ${res.headers['content-type'] ? res.headers['content-type'] : 'undefined'}`);
      }

      if (error) {
        console.error(error.message);
        res.resume();
        return {};
      }

      res.setEncoding('utf-8');
      let raw: string = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try {
          const data = JSON.parse(raw);
          return data;
        } catch (ex) {
          console.error(ex.message);
          return {};
        }
      });
    });
  }
}

export class Ships extends HieiAPI {
  constructor(client) {
    super(client);
  }

  search(query) {
    return this._fetch(endpoint.ship.search, query);
  }

  random(query) {
    return this._fetch(endpoint.ship.search, query);
  }

  id(query) {
    return this._fetch(endpoint.ship.id, query);
  }

  rarity(query) {
    return this._fetch(endpoint.ship.rarity, query);
  }

  hull(query) {
    return this._fetch(endpoint.ship.hullType, query);
  }

  class(query) {
    return this._fetch(endpoint.ship.shipClass, query);
  }

  nationality(query) {
    return this._fetch(endpoint.ship.nationality, query);
  }
}

export class Equipments extends HieiAPI {
  constructor(client) {
    super(client);
  }

  search(query) {
    return this._fetch(endpoint.equipment.search, query);
  }

  random(query) {
    return this._fetch(endpoint.equipment.random, query);
  }

  nationality(query) {
    return this._fetch(endpoint.equipment.nationality, query);
  }

  category(query) {
    return this._fetch(endpoint.equipment.category, query);
  }
}

export class Barrages extends HieiAPI {
  constructor(client) {
    super(client);
  }

  name(query) {
    return this._fetch(endpoint.barrage.name, query);
  }

  ship(query) {
    return this._fetch(endpoint.barrage.ship, query);
  }
}

export class Events extends HieiAPI {
  constructor(client) {
    super(client);
  }

  search(query) {
    return this._fetch(endpoint.event.search, query);
  }
}

export class Chapters extends HieiAPI {
  constructor(client) {
    super(client);
  }

  code(query) {
    return this._fetch(endpoint.chapter.code, query);
  }

  search(query) {
    return this._fetch(endpoint.chapter.search, query);
  }
}

export class Voicelines extends HieiAPI {
  constructor(client) {
    super(client);
  }

  id(query) {
    return this._fetch(endpoint.voice.id, query);
  }
}
