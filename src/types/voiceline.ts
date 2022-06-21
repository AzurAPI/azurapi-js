// voiceline.ts
/**
 * Voiceline types
 * @packageDocumentation
 */

export type Voiceline = VoicelineData & {
  id: string;
}

interface VoicelineData {
  Default: Line[];
  Retrofit: Line[];
  [key: string]: Line[]
}
interface Line {
  event: string;
  en?: string;
  zh?: string;
  jp?: string;
  audio?: string;
}
