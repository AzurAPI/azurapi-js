"use strict";
// UnknownEquipmentError.ts
/**
 * Unknown Equipment Error
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error to throw when the equipment's id or name was not found
 */
class UnknownEquipmentError extends Error {
    constructor(id) {
        super(`Unable to find equipment by query "${id}"`);
        this.query = id;
        this.name = 'UnknownEquipmentError';
    }
}
exports.default = UnknownEquipmentError;
//# sourceMappingURL=UnknownEquipmentError.js.map