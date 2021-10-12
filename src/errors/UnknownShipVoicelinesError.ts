// UnknownShipVoicelinesError.ts
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
  public query: string;

  constructor(id: string) {
    super(`Unable to find voice lines for ship by query "${id}"`);

    this.query = id;
    this.name = 'UnknownShipVoicelinesError';
  }
}
