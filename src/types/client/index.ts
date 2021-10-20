import { LocalFiles } from '../../core/database';
import { Events } from '../../core/events';
import { Datatype } from '../../core/state';

export interface UpdaterTemplate {
  updateAllModules: () => Promise<void>;
  updateModule: (type: Datatype) => Promise<void>;
  startUpdateInterval: () => void;
  stopUpdateInterval: () => void;
  loadModuleIntoStore: (type: Datatype) => void;
}

export type EventHandler = (event: Events, listener: any) => EventsTemplate;
export interface EventsTemplate {
  emit: <Action>(event: Events, action?: Action) => boolean;
  on: EventHandler;
  off: EventHandler;
}

export interface FileManager {
  read: <T>(path: string) => T;
  write: <T>(path: string, data: T) => void;
  exists: (path: string) => boolean;
  mkdir: (path: string) => void;
}

export type Fetch = <T = Record<string | number | symbol, unknown>>(url: string) => Promise<T>;

export interface ClientTools {
  fetch: Fetch;
  fileManager: FileManager;
  events: EventsTemplate;
  updater: UpdaterTemplate;
  localFiles: LocalFiles;
}
