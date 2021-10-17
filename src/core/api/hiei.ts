// hiei.ts
/**
 * Hiei api function
 * @packageDocumentation
 */

// TODO/WIP: Document usage and add input types

import { HieiClientOptions } from '../client/hieiClient';
import { URL, URLSearchParams } from 'url';
import http, { IncomingMessage } from 'http';

const endpoint = {
  ship: {
    search: '/ship/search',
    random: '/ship/random',
    id: '/ship/id',
    rarity: '/ship/rarity',
    hullType: '/ship/hullType',
    shipClass: '/ship/shipClass',
    nationality: '/ship/nationality',
  },
  equipment: {
    search: '/equip/search',
    random: '/equip/random',
    nationality: '/equip/nationality',
    category: '/equip/category',
  },
  barrage: {
    name: '/barrage/searchBarrageByName',
    ship: '/barrage/searchBarrageByShip',
  },
  event: {
    search: '/event/search',
  },
  chapter: {
    code: '/chapter/code',
    search: '/chapter/search',
  },
  voice: {
    id: '/voice/id',
  },
};

export interface CoreHieiAPI {
  request: <T>(endpoint: string, query: string) => Promise<T>;
}

/**
 * The Hiei API class
 */
const createCoreHieiAPI = (options: HieiClientOptions): CoreHieiAPI => {
  /**
   * Internal-ish request function to get data from Hiei API(s)
   * @param endpoint Hiei Endpoint
   * @param q Query
   */
  const request = <T>(endpoint: string, query: string): Promise<T> => {
    const url = new URL(endpoint, options.hiei.url);
    url.search = new URLSearchParams({ q: query }).toString();

    return new Promise((resolve, reject) => {
      const onResponse = (res: IncomingMessage) => {
        let error: Error | undefined;
        if (res.statusCode !== 200) {
          error = new Error(`Request Failed with Status Code: ${res.statusCode}`);
        } else if (!/^application\/json/.test(res.headers['content-type'] ? res.headers['content-type'] : '')) {
          error = new Error(
            `Invalid content-type. Expeceted "application/json" but received ${
              res.headers['content-type'] ? res.headers['content-type'] : 'undefined'
            }`
          );
        }

        if (error) {
          console.error(error.message);
          res.resume();
          reject(error);
        }

        res.setEncoding('utf-8');
        let raw: string = '';
        res.on('data', (c: string) => (raw += c));
        res.on('end', () => {
          try {
            const data: T = JSON.parse(raw);
            resolve(data);
          } catch (ex: any) {
            if (ex?.message) console.error(ex.message);
            reject();
          }
        });
      };
      http.get(url.toString(), { headers: { authorization: options.hiei.auth } }, onResponse);
    });
  };

  return { request };
};

const createShipsAPI = (core: CoreHieiAPI) => {
  const { request } = core;

  /**
   * Search Ships
   * @param query Ship name, ID, etc.
   */
  const search = <T>(query: string): Promise<T> => {
    return request(endpoint.ship.search, query);
  };

  /**
   * Get a random ship
   */
  const random = (query: string = '') => {
    return request(endpoint.ship.search, query);
  };

  /**
   * Get ship by id
   * @param query id
   */
  const id = <T>(query: string): Promise<T> => {
    return request(endpoint.ship.id, query);
  };

  /**
   * Get ship by rarity
   * @param query Rarity
   */
  const rarity = <T>(query: string): Promise<T> => {
    return request(endpoint.ship.rarity, query);
  };

  /**
   * Get ship by hull
   * @param query Hulltype
   */
  const hull = <T>(query: string): Promise<T> => {
    return request(endpoint.ship.hullType, query);
  };

  /**
   * Get ship by class
   * @param query Class
   */
  const classType = <T>(query: string): Promise<T> => {
    return request(endpoint.ship.shipClass, query);
  };

  /**
   * Get ship by nationality
   * @param query Nationality
   */
  const nationality = <T>(query: string): Promise<T> => {
    return request(endpoint.ship.nationality, query);
  };

  return {
    search,
    random,
    id,
    rarity,
    hull,
    classType,
    nationality,
  };
};

const createEquipmentsAPI = (core: CoreHieiAPI) => {
  const { request } = core;

  const search = <T>(query: string): Promise<T> => {
    return request(endpoint.equipment.search, query);
  };

  const random = <T>(query: string): Promise<T> => {
    return request(endpoint.equipment.random, query);
  };

  const nationality = <T>(query: string): Promise<T> => {
    return request(endpoint.equipment.nationality, query);
  };

  const category = <T>(query: string): Promise<T> => {
    return request(endpoint.equipment.category, query);
  };

  return {
    search,
    random,
    nationality,
    category,
  };
};

const createBarragesAPI = (core: CoreHieiAPI) => {
  const { request } = core;

  const name = <T>(query: string): Promise<T> => {
    return request(endpoint.barrage.name, query);
  };

  const ship = <T>(query: string): Promise<T> => {
    return request(endpoint.barrage.ship, query);
  };

  return {
    name,
    ship,
  };
};

const createEventsAPI = (core: CoreHieiAPI) => {
  const { request } = core;

  const search = <T>(query: string): Promise<T> => {
    return request(endpoint.event.search, query);
  };

  return {
    search,
  };
};

const createChaptersAPI = (core: CoreHieiAPI) => {
  const { request } = core;

  const code = <T>(query: string): Promise<T> => {
    return request(endpoint.chapter.code, query);
  };

  const search = <T>(query: string): Promise<T> => {
    return request(endpoint.chapter.search, query);
  };

  return {
    code,
    search,
  };
};

const createVoicelinesAPI = (core: CoreHieiAPI) => {
  const { request } = core;

  const id = <T>(query: string): Promise<T> => {
    return request(endpoint.voice.id, query);
  };

  return { id };
};

export const HieiAPI = {
  createCoreHieiAPI,
  createShipsAPI,
  createEquipmentsAPI,
  createBarragesAPI,
  createEventsAPI,
  createChaptersAPI,
  createVoicelinesAPI,
};

export declare module Hiei {
  export type ShipsAPI = ReturnType<typeof createShipsAPI>;
  export type EquipmentsAPI = ReturnType<typeof createEquipmentsAPI>;
  export type BarragesAPI = ReturnType<typeof createBarragesAPI>;
  export type EventsAPI = ReturnType<typeof createEventsAPI>;
  export type ChaptersAPI = ReturnType<typeof createChaptersAPI>;
  export type VoicelinesAPI = ReturnType<typeof createVoicelinesAPI>;
}
