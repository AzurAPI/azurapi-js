// voiceline.ts
/**
 * Voiceline types
 * @packageDocumentation
 */

import { Identifiable } from './identifiable';

export interface Voiceline extends Identifiable {
  event: string;
  en?: string;
  zh?: string;
  jp?: string;
  audio?: string;
}
