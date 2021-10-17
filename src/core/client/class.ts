import { EventsTemplate, UpdaterTemplate } from '../../types/client';
import { BarragesAPI } from '../api/barrage';
import { ChaptersAPI } from '../api/chapter';
import { EquipmentsAPI } from '../api/equipment';
import { ShipsAPI } from '../api/ship';
import { VoicelinesAPI } from '../api/voiceline';
import { AzurAPIState, ClientStateDispatcher } from '../state';
import { CoreAPI, createClient, LocalAzurAPIClient } from './client';
import { ClientOptions, GeneratedClientProps } from './clientFactory';

/**
 * Legacy class, similar as v2
 */
export class AzurAPI {
  public options: ClientOptions;
  public ships: ShipsAPI;
  public equipments: EquipmentsAPI;
  public chapters: ChaptersAPI;
  public voicelines: VoicelinesAPI;
  public barrages: BarragesAPI;
  public api: CoreAPI;
  public events: EventsTemplate;
  public updater: UpdaterTemplate;
  public state: AzurAPIState;
  public dispatch: ClientStateDispatcher;

  constructor(options: GeneratedClientProps = {}) {
    const client = createClient(options);
    this.options = client.options;
    this.events = client.events;
    this.ships = client.api.ships;
    this.api = client.api;
    this.equipments = client.api.equipments;
    this.chapters = client.api.chapters;
    this.voicelines = client.api.voicelines;
    this.barrages = client.api.barrages;
    this.state = client.state;
    this.dispatch = client.dispatch;
  }

  public withUpdater(create: (client: AzurAPI) => UpdaterTemplate) {
    this.updater = create(this);
    return this;
  }
}
