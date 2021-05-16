"use strict";
// ClearDataError.ts
/**
 * Clear Data Error
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error to throw when an error occures while clearing data
 */
class ClearDataError extends Error {
    constructor() {
        super('An error occured while clearing local JSON data.');
        this.name = 'ClearDataError';
    }
}
exports.default = ClearDataError;
//# sourceMappingURL=ClearDataError.js.map