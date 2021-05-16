"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PluginHook {
    constructor() {
        this.hooks = [];
    }
    register(name, action) {
        // if(typeof this.hooks === 'undefined') this.hooks[name] = [];
        if (typeof action !== 'function')
            return new Error('[Plugins] register action must be function.');
        this.hooks[name].push(action);
    }
    call(name, args) {
        if (typeof this.hooks[name] !== 'undefined') {
            for (let i = 0; i < this.hooks[name].length; ++i) {
                if (this.hooks[name][i](args) !== true) {
                    break;
                }
            }
        }
        else {
            throw new Error('[Plugins] there may be an issue with a registered plugin');
        }
    }
}
exports.default = PluginHook;
//# sourceMappingURL=Hook.js.map