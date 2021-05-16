/**
 * Extended equipment api functions
 * @packageDocumentation
 */
import { Equipment } from '../../types/equipment';
import API, { Language, advancedOptions } from './api';
import { AzurAPI } from '../../Client';
/**
 * Special equipments class for extended functionality
 */
declare class Equipments extends API<Equipment> {
    /**
     * Constructor
     * @param client An AzurAPI instance
     */
    constructor(client: AzurAPI);
    /**
     * Get equipment by name
     * @param name Equipment name
     * @param languages Language to search
     */
    name(name: string, languages?: Language[]): Equipment | undefined;
    /**
     * Lists the equipments by category
     * @param category name of the category you want to search for
     */
    category(category: string): Equipment[];
    /**
     * Lists the equipments by nationality
     * @param nationality naitionality name of the equipments you want to search for
     */
    nationality(nationality: string): Equipment[];
    private _nameAll;
    /**
     * Get equipment using name in any language or id
     * @param query Equipment name in any language or equipment id
     */
    get(query: string, adv?: advancedOptions): Equipment | undefined;
    /**
     * Get equipment using everything
     * @param query basically anyting i guess
     */
    all(query: string): Equipment[];
}
export { Equipments };
