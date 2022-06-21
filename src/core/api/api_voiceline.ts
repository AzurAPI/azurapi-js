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

  get(shipNameOrId: string) {
    if (this.client.queryIsShipName(shipNameOrId)) {
      const id = this.client.getShipIdByName(shipNameOrId);
      return this.raw.filter((vl) => vl.id === id)[0];
    }
    const vlsForId = this.raw.filter((vl) => vl.id === shipNameOrId);
    if (vlsForId.length === 0) {
      throw new Error("Must use ship name or ID to get voice lines.");
    }

    return vlsForId[0];
  }
}
