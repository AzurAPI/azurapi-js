// UnknownBarrageError.ts
/**
 * Unknown Barrage Error
 * @packageDocumentation
 */

/**
 * Error to throw when the barrage is not found
 */
export default class UnknownBarrageError extends Error {
    /**
     * The barrage's ID or name that wasn't found
     */
    public query: string;
  
    constructor(id: string) {
      super(`Unable to find barrage by query "${id}"`);
  
      this.query = id;
      this.name  = 'UnknownBarrageError';
    }
}
