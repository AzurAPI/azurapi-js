/**
 * Extended chapter api functions
 * @packageDocumentation
 */
import { Chapter } from '../../types/chapter';
import API from './api';
import { AzurAPI } from '../../Client';
/**
   * Special chapter class for extended functionality
   */
declare class Chapters extends API<Chapter> {
    /**
       * Constructor
       * @param client An AzurAPI instance
       */
    constructor(client: AzurAPI);
}
export { Chapters };
