/**
 * Extended barrage api functions
 * @packageDocumentation
 */
import { Barrage } from '../../types/barrage';
import API from './api';
import { AzurAPI } from '../../Client';
/**
  * Special barrage class for extended functionality
  */
declare class Barrages extends API<Barrage> {
    /**
      * Constructor
      * @param client An AzurAPI instance
      */
    constructor(client: AzurAPI);
}
export { Barrages };
