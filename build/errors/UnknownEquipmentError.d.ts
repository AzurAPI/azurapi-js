/**
 * Unknown Equipment Error
 * @packageDocumentation
 */
/**
 * Error to throw when the equipment's id or name was not found
 */
export default class UnknownEquipmentError extends Error {
    /**
     * The equipment's ID or name that wasn't found
     */
    query: string;
    constructor(id: string);
}
