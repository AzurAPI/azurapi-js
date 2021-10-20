import { Hiei } from '../api/hiei';
import { createHieiClient, HieiClientOptions } from './hieiClient';

/**
 * Legacy class, similar as v2
 */
export class HieiAzurAPI {
  public options: HieiClientOptions;
  public ships: Hiei.ShipsAPI;
  public equipments: Hiei.EquipmentsAPI;
  public chapters: Hiei.ChaptersAPI;
  public voicelines: Hiei.VoicelinesAPI;
  public barrages: Hiei.BarragesAPI;

  constructor(options: HieiClientOptions) {
    const client = createHieiClient(options);
    this.options = client.options;
    this.ships = client.api.ships;
    this.equipments = client.api.equipments;
    this.chapters = client.api.chapters;
    this.voicelines = client.api.voicelines;
    this.barrages = client.api.barrages;
  }
}
