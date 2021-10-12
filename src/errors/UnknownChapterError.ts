// UnknownChapterError.ts
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
  public query: string;

  constructor(id: string) {
    super(`Unable to find chapter by query "${id}"`);

    this.query = id;
    this.name = 'UnknownChapterError';
  }
}
