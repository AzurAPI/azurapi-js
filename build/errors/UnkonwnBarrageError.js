"use strict";
// UnknownBarrageError.ts
/**
 * Unknown Barrage Error
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error to throw when the barrage is not found
 */
class UnknownBarrageError extends Error {
    constructor(id) {
        super(`Unable to find barrage by query "${id}"`);
        this.query = id;
        this.name = 'UnknownBarrageError';
    }
}
exports.default = UnknownBarrageError;
//# sourceMappingURL=UnkonwnBarrageError.js.map