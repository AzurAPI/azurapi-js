import { EventsTemplate, FileManager } from '@atsu/multi-env-impl';
import { LocalFiles } from '../../core/database';
import { Datatype } from '../../core/state';
import { VersionHandler } from '../../core/tools/versionHandler';
import { FetchAPI } from '../../core/utils/api';

export interface UpdaterTemplate {
  updateAllModules: () => Promise<void>;
  updateModule: (type: Datatype) => Promise<void>;
  startUpdateInterval: () => void;
  stopUpdateInterval: () => void;
  loadModuleIntoStore: (type: Datatype) => void;
}

export interface ClientTools {
  fetchAPI: FetchAPI;
  fileManager: FileManager;
  events: EventsTemplate;
  localFiles: LocalFiles;
}

export interface ClientModules {
  updater: UpdaterTemplate;
  versionHandler: VersionHandler;
}
