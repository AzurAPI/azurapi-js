// api_barrage.ts
/**
 * Extended barrage api functions
 * @packageDocumentation
 */
import { Barrage, Hull, Ships } from '../../types/barrage';
import API, { Language, normalize, NATIONS, advancedOptions } from './api';
import { AzurAPI } from '../Client';

/**
 * Special barrage class for extended functionality
 */
export class Barrages extends API<Barrage> {
  /**
   * Constructor
   * @param client An AzurAPI instance
   */
  constructor(client: AzurAPI) {
    super(client, ['id', 'name']);
  }
  /**
   * Get barrage by name
   * @param name Barrage name
   */
  name(name: string): Barrage | undefined {
    for (let barrage of this.raw)
      if (normalize(barrage.name.toUpperCase()) === normalize(name.toUpperCase())) return barrage;
    return undefined;
  }

  /**
   * Get barrage by type
   * @param type Barrage type
   */
  type(type: 'ship' | 'class' | 'skill'): Barrage[] | void[] {
    return this.raw.filter(barrage => normalize(barrage.type.toUpperCase()) === normalize(type.toUpperCase()));
  }

  /**
   * Get barrage by hull type
   * @param hull Hull type
   */
  hull(hull: Hull): Barrage[] | void[] {
    return this.raw.filter(barrage => normalize(barrage.hull.toUpperCase()) === normalize(hull.toUpperCase()));
  }

  /**
   * Sort barrages by compatable ship
   * @param ship A ship name
   */
  ships(ship: Ships): Barrage[] | void[] {
    return this.raw.filter(barrage =>
      barrage.ships.map(ship => normalize(ship.toUpperCase())).includes(normalize(ship.toUpperCase()))
    );
  }
}
