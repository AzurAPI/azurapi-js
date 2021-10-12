// ClearDataError.ts
/**
 * Clear Data Error
 * @packageDocumentation
 */

/**
 * Error to throw when an error occures while clearing data
 */
export default class ClearDataError extends Error {
  constructor() {
    super('An error occured while clearing local JSON data.');

    this.name = 'ClearDataError';
  }
}
