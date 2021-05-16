"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Barrages = void 0;
const api_1 = __importDefault(require("./api"));
/**
  * Special barrage class for extended functionality
  */
class Barrages extends api_1.default {
    /**
      * Constructor
      * @param client An AzurAPI instance
      */
    constructor(client) {
        super(client, ['id', 'name']);
    }
}
exports.Barrages = Barrages;
//# sourceMappingURL=api_barrage.js.map