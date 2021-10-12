export interface ops {
  name: string;
  version: string;
  functions: {
    update;
    methods?: {
      ship;
      equipments;
      chapters;
      voicelines;
      barrage;
    };
  };
}

export default class PluginSource {
  public sources: any[];
  constructor() {
    this.sources = [];
  }

  public register(plugin: ops) {
    const name = plugin.name;
    const version = plugin.version;
    const functions = plugin.functions;
    if (!name || !version || !functions) throw new Error('[Sources] Broken source (check for missing parameters)');
    this.sources[name].push(plugin);
  }

  public get(plugin: string) {
    if (typeof this.sources[plugin] !== 'undefined') {
      return this.sources[plugin];
    } else {
      throw new Error(`[Sources] source "${plugin}" does not exist.`);
    }
  }
}
