// api_voiceline.ts
/**
 * Extended voicelines api functions
 * @packageDocumentation
 */
import { Voiceline } from "../../types/voiceline";
import API, { normalize, Language } from "./api";
import { AzurAPI } from "../Client";

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

  get(shipName: string) {
    if (!this.client.queryIsShipName(shipName)) {
      throw new Error("Must use ship name to get voice lines.");
    }
    const id = this.client.getShipIdByName(shipName);

    return this.raw.filter((vl) => vl.id === id);
  }
}
