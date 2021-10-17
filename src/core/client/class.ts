import { EventsTemplate, UpdaterTemplate } from '../../types/client';
import { BarragesAPI } from '../api/barrage';
import { ChaptersAPI } from '../api/chapter';
import { EquipmentsAPI } from '../api/equipment';
import { ShipsAPI } from '../api/ship';
import { VoicelinesAPI } from '../api/voiceline';
import { CoreAPI, createClient } from './client';
import { AzurAPIClient, GeneratedClientProps } from './clientFactory';

/**
 * Legacy class, similar as v2
 */
export class AzurAPI {
  public options: GeneratedClientProps;
  public source: string;
  public autoupdate: boolean;
  public rate: number;
  public ships: ShipsAPI;
  public equipments: EquipmentsAPI;
  public chapters: ChaptersAPI;
  public voicelines: VoicelinesAPI;
  public barrages: BarragesAPI;
  public api: CoreAPI;
  public updater: UpdaterTemplate;
  public events: EventsTemplate;

  public client: AzurAPIClient<GeneratedClientProps, CoreAPI>;

  constructor(options: GeneratedClientProps = {}) {
    this.client = createClient(options);
    this.options = this.client.options;
    this.updater = this.client.updater;
    this.events = this.client.events;
    this.ships = this.client.api.ships;
    this.equipments = this.client.api.equipments;
    this.chapters = this.client.api.chapters;
    this.voicelines = this.client.api.voicelines;
    this.barrages = this.client.api.barrages;
  }
}
