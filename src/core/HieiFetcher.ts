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

  /**
   * Get ship from hiei
   * @param query Ship
   */
  async getShip(query: string) {
    return this.fetch('/ship/search', query);
  }

  /**
   * Get ship from hiei by id
   * @param query Ship ID
   */
  async getShipById(query: string) {
    return this.fetch('/ship/id', query);
  }

  /**
   * Get ship from hiei by rarity
   * @param query Ship Rarity
   */
  async getShipByRarity(query: string) {
    return this.fetch('/ship/rarity', query);
  }

  /**
   * Get ship from hiei by hull type
   * @param query Ship Hull Type
   */
  async getShipByHullType(query: string) {
    return this.fetch('/ship/hullType', query);
  }

  /**
   * Get ship from hiei by class
   * @param query Ship Class
   */
  async getShipByClass(query: string) {
    return this.fetch('/ship/shipClass', query);
  }

  /**
   * Get ship from hiei by nationality
   * @param query Nationality
   */
  async getShipByNationality(query: string) {
    return this.fetch('/ship/nationality', query);
  }

  /**
   * Get equipment from hiei
   * @param query Equipment Name
   */
  async getEquipment(query: string) {
    return this.fetch('/equip/search', query);
  }

  /**
   * Get equipment from hiei by nationality
   * @param query Equipment Nationality
   */
  async getEquipmentByNationality(query: string) {
    return this.fetch('/equip/search', query);
  }
  
  /**
   * Get equipment from hiei by category
   * @param query Equipment Category
   */
  async getEquipmentByCategory(query: string) {
    return this.fetch('/equip/category', query);
  }
}
