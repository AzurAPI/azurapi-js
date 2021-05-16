"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// CacheUpdater.ts
/**
 * Functions relating to updating the cache
 * @packageDocumentation
 */
const Data_1 = require("./Data");
const fs_1 = __importDefault(require("fs"));
const UpdateChecker_1 = require("./UpdateChecker");
class Updater {
    /**
     * Constructor
     * @param client AzurAPI instance
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Check for updates then update and load cache
     */
    update() {
        return UpdateChecker_1.check().then(updates => {
            if (updates.length > 0) {
                this.client.emit('updateAvalible', updates);
                return Promise.all(updates.map(async (type) => {
                    let raw = Object.values(JSON.parse(await UpdateChecker_1.fetch(Data_1.data[type])) || []);
                    this.client.set(type, raw);
                    fs_1.default.writeFileSync(Data_1.local[type], JSON.stringify(raw));
                }));
            }
        });
    }
    /**
     * Start cron job
     */
    start() {
        if (!this.cron)
            this.client.emit('debug', 'Notify for new data updates enabled. AzurAPI Client will check for data updates every hour.');
        if (this.cron)
            clearInterval(this.cron);
        this.cron = setInterval(() => this.update(), this.client.rate);
    }
    /**
     * Stop cron job
     */
    stop() {
        if (this.cron)
            clearInterval(this.cron);
        this.cron = undefined;
    }
    /**
     * Check if folder and JSON files exist then load cache
     */
    async init() {
        if (!fs_1.default.existsSync(Data_1.baseFolder))
            fs_1.default.mkdirSync(Data_1.baseFolder);
        await this.load();
        this.client.emit('ready');
    }
    /**
     * Load the cache
     */
    load() {
        for (let i = 0; i < Object.keys(Data_1.local).length; i++) {
            let key = Object.keys(Data_1.local)[i];
            if (!fs_1.default.existsSync(Data_1.local[key]))
                return this.update();
            this.client.set(key, Object.values(JSON.parse(fs_1.default.readFileSync(Data_1.local[key]).toString()) || []));
        }
    }
}
exports.default = Updater;
//# sourceMappingURL=CacheUpdater.js.map