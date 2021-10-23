import { EventsTemplate, FetchTemplate, FileManager } from '@atsu/multi-env-impl';
import { LocalFiles } from '../../core/database';
import { Datatype } from '../../core/state';

export interface UpdaterTemplate {
  updateAllModules: () => Promise<void>;
  updateModule: (type: Datatype) => Promise<void>;
  startUpdateInterval: () => void;
  stopUpdateInterval: () => void;
  loadModuleIntoStore: (type: Datatype) => void;
}

export interface ClientTools {
  fetch: FetchTemplate;
  fileManager: FileManager;
  events: EventsTemplate;
  updater: UpdaterTemplate;
  localFiles: LocalFiles;
}
