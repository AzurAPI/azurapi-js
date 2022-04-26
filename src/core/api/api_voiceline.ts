// api_voiceline.ts
/**
 * Extended voicelines api functions
 * @packageDocumentation
 */
import { Voiceline } from '../../types/voiceline';
import API, { normalize, Language } from './api';
import { AzurAPI } from '../Client';

/**
 * Special voicelines class for extended functionality
 */
export class Voicelines extends API<Voiceline> {
  /**
   * Constructor
   * @param client An AzurAPI instance
   */
  constructor(client: AzurAPI) {
    super(client);
  }

  // id(id: string): Voiceline | undefined {
  //   for (let item of this.raw) {
  //     for (let type of Object.values(item)) {
  //       for (let sub of type) if (normalize(sub.event.toUpperCase()) === normalize(id.toUpperCase())) return item;
  //     }
  //   }
  //   return undefined;
  // }
  line(line: string, languages: Language[] = ['en', 'cn', 'jp', 'kr']): Voiceline[] | [] {
    return this.raw.filter(ship => languages.some(lang => ship.names[lang] && normalize(ship.names[lang].toUpperCase()) === normalize(line.toUpperCase())));
  }
}
