import { BarragesAPI } from '../api/barrage';
import { ChaptersAPI } from '../api/chapter';
import { EquipmentsAPI } from '../api/equipment';
import { ShipsAPI } from '../api/ship';
import { VoicelinesAPI } from '../api/voiceline';
import { AzurAPIState, ClientStateDispatcher } from '../state';
import { CoreAPI, createLocalClient } from './localClient';
import { CreateClientProps } from '../../types/client/client';
import { ClientTools } from '../../types/client';

/**
 * Legacy class, similar as v2
 */
export class AzurAPI {
  public options: CreateClientProps;
  public ships: ShipsAPI;
  public equipments: EquipmentsAPI;
  public chapters: ChaptersAPI;
  public voicelines: VoicelinesAPI;
  public barrages: BarragesAPI;
  public api: CoreAPI;
  public state: AzurAPIState;
  public dispatch: ClientStateDispatcher;
  public tools: ClientTools;

  constructor(options: Partial<CreateClientProps> = {}) {
    const client = createLocalClient(options);
    this.options = client.options;
    this.ships = client.api.ships;
    this.api = client.api;
    this.equipments = client.api.equipments;
    this.chapters = client.api.chapters;
    this.voicelines = client.api.voicelines;
    this.barrages = client.api.barrages;
    this.state = client.state;
    this.dispatch = client.dispatch;
    this.tools = client.tools;
  }
}
