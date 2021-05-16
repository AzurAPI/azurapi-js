/**
 * Unknown Voice Lines Error
 * @packageDocumentation
 */
/**
 * Error to throw when the voice lines for ship id was not found
 */
export default class UnknownShipVoicelinesError extends Error {
    /**
     * The voiceline for ship ID that wasn't found
     */
    query: string;
    constructor(id: string);
}
