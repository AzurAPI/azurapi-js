// UnserialisableError.ts
/**
 * Unserialisable Error
 * @packageDocumentation
 */

/**
 * Error to throw when we can't get the contents from GitHub
 */
export default class UnserialiseableError extends Error {
  constructor() {
    super('Unable to serialise the contents from GitHub, try again later');

    this.name = 'UnserialiseableError';
  }
}
