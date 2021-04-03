
type action = () => void;

export default class PluginHook {
    private hooks: string[];
    constructor() {
      this.hooks = [];
    }

    public register(name:string, action:action) {
      // if(typeof this.hooks === 'undefined') this.hooks[name] = [];
      if (typeof action !== 'function') return new Error('[Plugins] register action must be function.');
      this.hooks[name].push(action);
    }

    public call(name:string, args:any[]) {
      if (typeof this.hooks[name] !== 'undefined') {
        for(let i = 0; i < this.hooks[name].length; ++i) {
          if(this.hooks[name][i](args) !== true) {
            break;
          }
        }
      } else {
        throw new Error('[Plugins] there may be an issue with a registered plugin');
      }
    }
}
