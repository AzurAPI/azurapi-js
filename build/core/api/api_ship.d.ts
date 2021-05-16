/**
 * Extended ship api functions
 * @packageDocumentation
 */
import { Ship } from '../../types/ship';
import API, { Language, NATIONS, advancedOptions } from './api';
import { AzurAPI } from '../../Client';
/**
 * Special ships class for extended functionality
 */
declare class Ships extends API<Ship> {
    /**
     * Constructor
     * @param client An AzurAPI instance
     */
    constructor(client: AzurAPI);
    /**
     * Get ship by name
     * @param name Ship name
     * @param languages Language to search
     */
    name(name: string, languages?: Language[]): Ship | undefined;
    /**
     * Get ship by hull
     * @param hull Hull name
     */
    hull(hull: string): Ship[];
    /**
     * Get ship by nationality
     * @param nationality Nationality name
     */
    nationality(nationality: string): Ship[];
    private _nameAll;
    /**
     * Get ship using name in any language or id
     * @param query Ship name in any language or ship id
     */
    get(query: string, adv?: advancedOptions): Ship | undefined;
    /**
     * Get ship using everything
     * @param query basically anyting i guess
     */
    all(query: string): Ship[];
}
export { Ships, NATIONS };
