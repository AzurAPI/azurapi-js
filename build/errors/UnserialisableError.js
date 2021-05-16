"use strict";
// UnserialisableError.ts
/**
 * Unserialisable Error
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error to throw when we can't get the contents from GitHub
 */
class UnserialiseableError extends Error {
    constructor() {
        super('Unable to serialise the contents from GitHub, try again later');
        this.name = 'UnserialiseableError';
    }
}
exports.default = UnserialiseableError;
//# sourceMappingURL=UnserialisableError.js.map