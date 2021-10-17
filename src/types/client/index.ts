export interface UpdaterTemplate {
  update: () => Promise<void[]>;
  start: () => void;
  stop: () => void;
  init: () => Promise<void>;
  load: () => Promise<void[]>;
}

export interface EventsTemplate {
  emit: <T>(event: string, action?: T) => boolean;
  on: (event: string | symbol, listener: (...args: any[]) => void) => this;
  off: (event: string | symbol, listener: (...args: any[]) => void) => this;
  once: (event: string | symbol, listener: (...args: any[]) => void) => this;
}
