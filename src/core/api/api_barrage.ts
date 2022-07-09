// api_barrage.ts
/**
 * Extended barrage api functions
 * @packageDocumentation
 */
import { Barrage, Hull, Ships } from '../../types/barrage';
import API, { normalize } from './api';
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
   * Get by id
   * @param id String of number
   */
  id(id: string): Barrage | undefined {
    for (let item of this.raw)
      if (normalize(item.id.toUpperCase()) === normalize(id.toUpperCase())) return item;
    return undefined;
  }

  /**
   * Get barrage by name
   * @param name Barrage name
   */
  name(name: string): Barrage[] | [] {
    return this.raw.filter(
      (barrage) => normalize(barrage.name.toUpperCase()) === normalize(name.toUpperCase())
    );
  }
  /**
   * Get barrage by type
   * @param type Barrage type
   */
  type(type: 'ship' | 'class' | 'skill'): Barrage[] | [] {
    return this.raw.filter(
      (barrage) => normalize(barrage.type.toUpperCase()) === normalize(type.toUpperCase())
    );
  }

  /**
   * Get barrage by hull type
   * @param hull Hull type
   */
  hull(hull: Hull): Barrage[] | [] {
    return this.raw.filter(
      (barrage) => normalize(barrage.hull.toUpperCase()) === normalize(hull.toUpperCase())
    );
  }

  /**
   * Sort barrages by compatable ship
   * @param ship A ship name
   */
  ships(ship: Ships): Barrage[] | [] {
    return this.raw.filter((barrage) =>
      barrage.ships
        .map((ship) => normalize(ship.toUpperCase()))
        .includes(normalize(ship.toUpperCase()))
    );
  }

  get(query: string) {
    if (this.client.queryIsShipName(query)) {
      // Get barrages with this ship in it's `ships` array.
      return this.raw.filter((r) => {
        // TODO: On api initialization, pre-uppercase and normalize ship names and overwrite (or store as memoized) so every search doesnt loop over the array
        const comparisonArr = r.ships.map((s) => s.toUpperCase());
        if (comparisonArr.indexOf(query.toUpperCase()) !== -1) {
          // Faster than `.includes`
          return true;
        }
        return false;
      });
    }
    return this.fuze(query).map((s) => s.item);
  }
}
