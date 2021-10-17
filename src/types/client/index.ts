import { Datatype } from '../../core/state';

export interface UpdaterTemplate {
  update: (type: Datatype) => Promise<void>;
  start: () => void;
  stop: () => void;
  init: () => Promise<void>;
  load: () => void;
}

export interface EventsTemplate {
  emit: <T>(event: string, action?: T) => boolean;
  on: (event: string | symbol, listener: (...args: any[]) => void) => this;
  off: (event: string | symbol, listener: (...args: any[]) => void) => this;
  once: (event: string | symbol, listener: (...args: any[]) => void) => this;
}
