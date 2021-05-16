"use strict";
// UnknownShipError.ts
/**
 * Unknown Ship Error
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error to throw when the ship's id or name was not found
 */
class UnknownShipError extends Error {
    constructor(id) {
        super(`Unable to find ship by query "${id}"`);
        this.query = id;
        this.name = 'UnknownShipError';
    }
}
exports.default = UnknownShipError;
//# sourceMappingURL=UnknownShipError.js.map