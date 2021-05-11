// api_chapters.ts
/**
 * Extended chapter api functions
 * @packageDocumentation
 */
import { Chapter } from '../../types/chapter';
import API, { Language, normalize, NATIONS, advancedOptions } from './api';
import { AzurAPI } from '../../Client';

/**
   * Special chapter class for extended functionality
   */
class Chapters extends API<Chapter> {
  /**
     * Constructor
     * @param client An AzurAPI instance
     */
  constructor(client: AzurAPI) {
    super(client);
  }

}
export { Chapters };
