// api_barrage.ts
/**
 * Extended barrage api functions
 * @packageDocumentation
 */
import { Barrage } from '../../types/barrage';
import API, { Language, normalize, NATIONS, advancedOptions } from './api';
import { AzurAPI } from '../../Client';

/**
  * Special barrage class for extended functionality
  */
class Barrages extends API<Barrage> {
  /**
    * Constructor
    * @param client An AzurAPI instance
    */
  constructor(client: AzurAPI) {
    super(client, ['id', 'name']);
  }

}
export { Barrages };
