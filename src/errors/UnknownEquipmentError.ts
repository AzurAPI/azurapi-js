/**
 * Error to throw when the equipment's id or name was not found
 */
export default class UnknownEquipmentError extends Error {
  /**
   * The equipment's ID or name that wasn't found
   */
  public query: string;

  constructor(id: string) {
    super(`Unable to find equipment by query "${id}"`);

    this.query = id;
    this.name  = 'UnknownEquipmentError';
  }
}
