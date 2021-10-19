import { Datatype } from '../../core/state';

export interface UpdaterTemplate {
  updateAllModules: () => Promise<void>;
  updateModule: (type: Datatype) => Promise<void>;
  startUpdateInterval: () => void;
  stopUpdateInterval: () => void;
  loadModuleIntoStore: (type: Datatype) => void;
}

export interface EventsTemplate {
  emit: <T>(event: string, action?: T) => boolean;
  on: (event: string | symbol, listener: (...args: any[]) => void) => this;
  off: (event: string | symbol, listener: (...args: any[]) => void) => this;
  once: (event: string | symbol, listener: (...args: any[]) => void) => this;
}
