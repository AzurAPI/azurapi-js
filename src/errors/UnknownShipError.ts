/**
 * Error to throw when the ship's id or name was not found
 */
export default class UnknownShipError extends Error {
  /**
   * The ship's ID or name that wasn't found
   */
  public query: string;

  constructor(id: string) {
    super(`Unable to find ship by query "${id}"`);

    this.query = id;
    this.name  = 'UnknownShipError';
  }
}
