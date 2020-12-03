// UpdateError.ts
/**
 * Update Error
 * @packageDocumentation
 */

/**
 * Error to throw when something goes wrong during updating.
 */
export default class UpdateError extends Error {
  constructor() {
    super('An error occured while updating.');
    
    this.name  = 'UpdateError';
  }
}
