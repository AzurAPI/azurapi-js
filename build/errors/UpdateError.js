"use strict";
// UpdateError.ts
/**
 * Update Error
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error to throw when something goes wrong during updating.
 */
class UpdateError extends Error {
    constructor() {
        super('An error occured while updating.');
        this.name = 'UpdateError';
    }
}
exports.default = UpdateError;
//# sourceMappingURL=UpdateError.js.map