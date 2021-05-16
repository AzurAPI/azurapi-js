/**
 * Default api function
 * @packageDocumentation
 */
import Fuse from 'fuse.js';
import { Identifiable } from '../../types/identifiable';
import { AzurAPI } from '../../Client';
import FuseResult = Fuse.FuseResult;
export declare type Language = 'en' | 'cn' | 'jp' | 'kr';
export interface advancedOptions {
    nameOnly?: boolean;
    idOnly?: boolean;
    language?: Language;
}
export declare const NATIONS: {
    'Eagle Union': string[];
    'Royal Navy': string[];
    'Sakura Empire': string[];
    'Iron Blood': string[];
    'Dragon Empery': string[];
    'Northern Parliament': string[];
    'Iris Libre': string[];
    'Vichya Domination': string[];
    'Sardenga Empire': string[];
    Neptunia: string[];
    Bilibili: string[];
    'Venus Vacation': string[];
    Utawarerumono: string[];
    'Kizuna AI': string[];
    Hololive: string[];
    META: string[];
    Universal: string[];
};
/**
 * The Main API class
 */
export default class API<T extends Identifiable> {
    raw: T[];
    fuse?: Fuse<T>;
    private client;
    /**
     * Constructor
     * @param client AzurAPI instance
     * @param keys Arrays of keys to pass on to fuse
     */
    constructor(client: AzurAPI, keys?: string[]);
    /**
     * Set the cache
     * @param raw Array
     */
    setData(raw: T[]): void;
    /**
     * Search fuse cache
     * @param name Any
     */
    fuze(name: string): FuseResult<T>[];
    /**
     * Get by id
     * @param id String of number
     */
    id(id: string): T | undefined;
    /**
     * Get by any
     * @param query Any
     */
    get(query: string): T | undefined;
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
     */
    filter(predicate: (value: T, index: number, array: T[]) => unknown): T[];
    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
     */
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[];
    /**
     * Performs the specified action for each element in an array.
     * @param callbackfn A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
     */
    forEach(callbackfn: (value: T, index: number, array: T[]) => void): void;
    /**
     * Determines whether all the members of an array satisfy the specified test
     * @param predicate A function that accepts up to three arguments. The every method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
     */
    every(predicate: (value: T, index: number, array: T[]) => unknown): boolean;
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param predicate A function that accepts up to three arguments. The some method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value true, or until the end of the array.
     */
    some(predicate: (value: T, index: number, array: T[]) => unknown): boolean;
}
/**
 * Normalize a string
 * @param string A string
 */
export declare function normalize(string: any): any;
