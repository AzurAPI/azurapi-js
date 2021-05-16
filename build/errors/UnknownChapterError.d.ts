/**
 * Unknown Chapter Error
 * @packageDocumentation
 */
/**
 * Error to throw when the chapter was not found
 */
export default class UnknownChapterError extends Error {
    /**
     * The chapter that wasn't found
     */
    query: string;
    constructor(id: string);
}
