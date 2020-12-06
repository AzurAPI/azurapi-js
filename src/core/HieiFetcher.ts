// HieiFetcher.ts
/**
 * Functions to get data using hiei
 * @packageDocumentation
 */

import { HttpClient } from '@augu/orchid';
import { URLSearchParams } from 'url';

/**
 * Fetcher to grab anything from hiei
 */
export default class HieiFetcher {
  /**
   * The client to use to request
   */
  private http: HttpClient;
  
  /**
   * Creates a new [HieiFetcher] instance
   */
  constructor(url: string, auth: string) {
    this.http = new HttpClient({
      defaults: {
        baseUrl: url,
        headers: {
          'Accept': 'application/json',
          'authorization': auth
        }
      }
    });
  }

  /**
   * Fetch data from Hiei
   * @param endpoint Hiei API endpoint
   * @param q Query
   */
  async fetch(endpoint: string, q: string) {
    let query = new URLSearchParams({ q }).toString();
    let res = await this.http.get(`${endpoint.toString()}?${query}`);
    let data: any[] = [];

    try {
      data = res.json();
    } catch(ex) {
      throw new Error;
    }
  
    return data;
  }

  async getShip(query: string) {
    return this.fetch('/ship/search', query);
  }

  async getShipById(query: string) {
    return this.fetch('/ship/id', query);
  }

  async getShipByRarity(query: string) {
    return this.fetch('/ship/rarity', query);
  }

  async getShipByHullType(query: string) {
    return this.fetch('/ship/hullType', query);
  }

  async getShipByClass(query: string) {
    return this.fetch('/ship/shipClass', query);
  }

  async getShipByNationality(query: string) {
    return this.fetch('/ship/nationality', query);
  }

  async getEquipment(query: string) {
    return this.fetch('/equip/search', query);
  }

  async getEquipmentByNationality(query: string) {
    return this.fetch('/equip/search', query);
  }
  
  async getEquipmentByCategory(query: string) {
    return this.fetch('/equip/category', query);
  }
}
