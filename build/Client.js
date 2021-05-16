"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzurAPI = exports.instance = void 0;
const events_1 = require("events");
const CacheUpdater_1 = __importDefault(require("./core/CacheUpdater"));
const api_ship_1 = require("./core/api/api_ship");
const api_equipment_1 = require("./core/api/api_equipment");
const api_barrage_1 = require("./core/api/api_barrage");
const api_1 = __importDefault(require("./core/api/api"));
/**
 * The main AzurAPI class
 */
class AzurAPI extends events_1.EventEmitter {
    /**
     * Cache client
     * @param options options for the cache
     */
    constructor(options) {
        super();
        this.ships = new api_ship_1.Ships(this);
        this.equipments = new api_equipment_1.Equipments(this);
        this.chapters = new api_1.default(this);
        this.voicelines = new api_1.default(this);
        this.barrages = new api_barrage_1.Barrages(this);
        this.apis = {
            ships: this.ships,
            equipments: this.equipments,
            chapters: this.chapters,
            voicelines: this.voicelines,
            barrages: this.barrages
        };
        this.options = options ? options : { source: 'local', autoupdate: true, rate: 3600000 };
        this.source = this.options.source ? this.options.source : 'local';
        this.autoupdate = this.options.autoupdate ? this.options.autoupdate : true;
        this.rate = this.options.rate ? this.options.rate : 3600000;
        this.updater = new CacheUpdater_1.default(this);
        this.updater.init();
        if (this.autoupdate)
            this.updater.start();
        exports.instance = this;
    }
    /**
     * Set data in cache
     * @param type A type of data (ship, equipment, voiceline, chapter, or barrage)
     * @param raw Raw data in array
     */
    set(type, raw) {
        if (!raw)
            return;
        let api = this.apis[type];
        if (api)
            api.setData(raw);
        return api;
    }
}
exports.AzurAPI = AzurAPI;
//# sourceMappingURL=Client.js.map