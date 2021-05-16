"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chapters = void 0;
const api_1 = __importDefault(require("./api"));
/**
   * Special chapter class for extended functionality
   */
class Chapters extends api_1.default {
    /**
       * Constructor
       * @param client An AzurAPI instance
       */
    constructor(client) {
        super(client);
    }
}
exports.Chapters = Chapters;
//# sourceMappingURL=api_chapter.js.map