"use strict";
// UnknownShipVoicelinesError.ts
/**
 * Unknown Voice Lines Error
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error to throw when the voice lines for ship id was not found
 */
class UnknownShipVoicelinesError extends Error {
    constructor(id) {
        super(`Unable to find voice lines for ship by query "${id}"`);
        this.query = id;
        this.name = 'UnknownShipVoicelinesError';
    }
}
exports.default = UnknownShipVoicelinesError;
//# sourceMappingURL=UnknownShipVoicelinesError.js.map