// merge.ts
/**
 * Merge Function
 * @packageDocumentation
 */

/**
 * Merges mutiple objects into one if any keys don't exist
 * @param args The objects to merge
 * @returns The merged object
 */
export function merge<T extends object, U extends object>(...args: T[]): U { // eslint-disable-line @typescript-eslint/ban-types
  const obj = {} as U;
  for (let i = 0; i < args.length; i++) {
    const temp = args[i];
    for (const k in temp) {
      if (!obj.hasOwnProperty(k)) obj[<any> k] = temp[k];
    }
  }

  return obj;
}
