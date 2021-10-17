import { EventsTemplate, UpdaterTemplate } from '../../types/client';
import { BarragesAPI } from '../api/barrage';
import { ChaptersAPI } from '../api/chapter';
import { EquipmentsAPI } from '../api/equipment';
import { ShipsAPI } from '../api/ship';
import { VoicelinesAPI } from '../api/voiceline';
import { AzurAPIState } from '../state';
import { CoreAPI, createClient, LocalAzurAPIClient } from './client';
import { ClientOptions, GeneratedClientProps } from './clientFactory';

/**
 * Legacy class, similar as v2
 */
export class AzurAPI {
  public options: ClientOptions;
  public source: string;
  public autoupdate: boolean;
  public rate: number;
  public ships: ShipsAPI;
  public equipments: EquipmentsAPI;
  public chapters: ChaptersAPI;
  public voicelines: VoicelinesAPI;
  public barrages: BarragesAPI;
  public api: CoreAPI;
  public events: EventsTemplate;
  public updater: UpdaterTemplate;
  public state: AzurAPIState;

  public client: LocalAzurAPIClient;

  constructor(options: GeneratedClientProps = {}) {
    this.client = createClient(options);
    this.options = this.client.options;
    this.events = this.client.events;
    this.ships = this.client.api.ships;
    this.equipments = this.client.api.equipments;
    this.chapters = this.client.api.chapters;
    this.voicelines = this.client.api.voicelines;
    this.barrages = this.client.api.barrages;
    this.state = this.client.state;
  }

  public withUpdater(create: (client: AzurAPI) => UpdaterTemplate) {
    this.updater = create(this);
    return this;
  }
}
