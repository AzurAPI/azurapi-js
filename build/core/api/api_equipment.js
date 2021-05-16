"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipments = void 0;
const api_1 = __importStar(require("./api"));
/**
 * Special equipments class for extended functionality
 */
class Equipments extends api_1.default {
    /**
     * Constructor
     * @param client An AzurAPI instance
     */
    constructor(client) {
        super(client, ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code', 'id']);
    }
    /**
     * Get equipment by name
     * @param name Equipment name
     * @param languages Language to search
     */
    name(name, languages = ['en', 'cn', 'jp', 'kr']) {
        for (let equipment of this.raw)
            if (languages.some(lang => equipment.names[lang] && api_1.normalize(equipment.names[lang].toUpperCase()) === api_1.normalize(name.toUpperCase())))
                return equipment;
        return undefined;
    }
    /**
     * Lists the equipments by category
     * @param category name of the category you want to search for
     */
    category(category) {
        let results = [];
        for (let equipment of this.raw)
            if (api_1.normalize(equipment.category.toUpperCase() === api_1.normalize(category.toUpperCase())))
                results.push(equipment);
        return results;
    }
    /**
     * Lists the equipments by nationality
     * @param nationality naitionality name of the equipments you want to search for
     */
    nationality(nationality) {
        let results = [];
        nationality = Object.keys(api_1.NATIONS).find(key => api_1.NATIONS[key].includes(nationality.toLowerCase())) || nationality;
        for (let equipment of this.raw)
            if (api_1.normalize(equipment.nationality.toUpperCase()) === api_1.normalize(nationality.toUpperCase()))
                results.push(equipment);
        return results;
    }
    _nameAll(name, languages = ['en', 'cn', 'jp', 'kr']) {
        return this.raw.filter(equipment => languages.some(lang => equipment.names[lang] && api_1.normalize(equipment.names[lang].toUpperCase()) === api_1.normalize(name.toUpperCase())));
    }
    /**
     * Get equipment using name in any language or id
     * @param query Equipment name in any language or equipment id
     */
    get(query, adv) {
        if (adv) {
            if (adv.idOnly) {
                return this.id(query);
            }
            else if (adv.nameOnly || adv.nameOnly && !adv.language) {
                return this.name(query);
            }
            else if (adv.nameOnly && adv.language) {
                return this.name(query, [adv.language]);
            }
        }
        else {
            let fuzeResult = this.fuze(query).sort((a, b) => (b.score || 0) - (a.score || 0))[0];
            return this.id(query) || this.name(query) || (fuzeResult ? fuzeResult.item : undefined);
        }
    }
    /**
     * Get equipment using everything
     * @param query basically anyting i guess
     */
    all(query) {
        let results = [];
        results.push(this.id(query));
        results.push(...this._nameAll(query).filter(i => i));
        results.push(...this.fuze(query).map(i => i.item));
        return results
            .filter((value) => value !== null && value !== undefined)
            .filter((elem, index, self) => index === self.findIndex(el => el.id === elem.id));
    }
}
exports.Equipments = Equipments;
//# sourceMappingURL=api_equipment.js.map