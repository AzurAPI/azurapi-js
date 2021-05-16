"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PluginSource {
    constructor() {
        this.sources = [];
    }
    register(plugin) {
        const name = plugin.name;
        const version = plugin.version;
        const functions = plugin.functions;
        if (!name || !version || !functions)
            throw new Error('[Sources] Broken source (check for missing parameters)');
        this.sources[name].push(plugin);
    }
    get(plugin) {
        if (typeof this.sources[plugin] !== 'undefined') {
            return this.sources[plugin];
        }
        else {
            throw new Error(`[Sources] source "${plugin}" does not exist.`);
        }
    }
}
exports.default = PluginSource;
//# sourceMappingURL=Source.js.map