// voiceline.ts
/**
 * Voiceline types
 * @packageDocumentation
 */

import { Identifiable } from './identifiable';

export interface Voiceline extends Identifiable {
  event: string;
  skin: string;
  en?: string;
  zh?: string;
  jp?: string;
  audio?: string;
}

export interface VoicelineResponse {
  [id: string]: { [skin: string]: Voiceline[] };
}
