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

export interface RequestOptionsTemplate {
  serverUrl: string;
  method?: 'GET' | 'POST';
  path?: string;
  headers?: Record<string, string>;
  body?: string;
}

export type FetchTemplate = <Response = Record<string | number | symbol, unknown>>(
  options: RequestOptionsTemplate
) => Promise<Response>;

export interface ClientTools {
  fetch: FetchTemplate;
  fileManager: FileManager;
  events: EventsTemplate;
  updater: UpdaterTemplate;
  localFiles: LocalFiles;
}
