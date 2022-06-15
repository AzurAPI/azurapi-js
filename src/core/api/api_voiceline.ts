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

  get(shipName: string) {
    if (!this.client.queryIsShipName(shipName)) {
      throw new Error('Must use ship name to get voice lines.');
    }
    const id = this.client.getShipIdByName(shipName);
    // console.log(this.raw);
    // const reverse = [...this.raw].reverse();
    // console.log(reverse[id]);
    return this.raw.filter((vl) => vl.id === id);
  }
  // line(
  //   line: string,
  //   languages: Language[] = ["en", "cn", "jp", "kr"]
  // ): Voiceline[] | [] {
  //   return this.raw.filter((ship) =>
  //     languages.some(
  //       (lang) =>
  //         ship.names[lang] &&
  //         normalize(ship.names[lang].toUpperCase()) ===
  //           normalize(line.toUpperCase())
  //     )
  //   );
  // }
}
