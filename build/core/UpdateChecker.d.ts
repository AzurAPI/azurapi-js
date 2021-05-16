/**
 * Check for updates and functions relating to updates
 * @packageDocumentation
 */
import { datatype } from './Data';
/**
 * Check for updates
 */
export declare function check(): Promise<datatype[]>;
/**
 * Save the version data
 */
export declare function save(): void;
/**
 * Fetch data
 * @param url URL
 */
export declare function fetch(url: string): Promise<string>;
