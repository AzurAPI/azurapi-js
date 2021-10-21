// api_voiceline.ts
/**
 * Extended chapter api functions
 * @packageDocumentation
 */
import { Voiceline } from '../../types/voiceline';
import API from './api';
import { AzurAPI } from '../Client';

/**
 * Special chapter class for extended functionality
 */
export class Voicelines extends API<Voiceline> {
  /**
   * Constructor
   * @param client An AzurAPI instance
   */
  constructor(client: AzurAPI) {
    super(client);
  }

}
