"use strict";
// UnknownChapterError.ts
/**
 * Unknown Chapter Error
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error to throw when the chapter was not found
 */
class UnknownChapterError extends Error {
    constructor(id) {
        super(`Unable to find chapter by query "${id}"`);
        this.query = id;
        this.name = 'UnknownChapterError';
    }
}
exports.default = UnknownChapterError;
//# sourceMappingURL=UnknownChapterError.js.map