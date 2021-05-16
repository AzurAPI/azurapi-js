/**
 * Unknown Ship Error
 * @packageDocumentation
 */
/**
 * Error to throw when the ship's id or name was not found
 */
export default class UnknownShipError extends Error {
    /**
     * The ship's ID or name that wasn't found
     */
    query: string;
    constructor(id: string);
}
