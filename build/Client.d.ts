/// <reference types="node" />
import { EventEmitter } from 'events';
import Updater from './core/CacheUpdater';
import { Ships } from './core/api/api_ship';
import { Equipments } from './core/api/api_equipment';
import { Barrages } from './core/api/api_barrage';
import API from './core/api/api';
import { Chapter } from './types/chapter';
import { Voiceline } from './types/voiceline';
import { datatype } from './core/Data';
export declare type Source = 'uncached' | 'local' | 'hiei';
export interface CacheOptions {
    source?: Source;
    autoupdate?: boolean;
    rate?: number;
}
export declare let instance: AzurAPI;
/**
 * The main AzurAPI class
 */
export declare class AzurAPI extends EventEmitter {
    options: CacheOptions;
    source: string;
    autoupdate: boolean;
    rate: number;
    updater: Updater;
    ships: Ships;
    equipments: Equipments;
    chapters: API<Chapter>;
    voicelines: API<Voiceline>;
    barrages: Barrages;
    apis: {
        ships: Ships;
        equipments: Equipments;
        chapters: API<Chapter>;
        voicelines: API<Voiceline>;
        barrages: Barrages;
    };
    /**
     * Cache client
     * @param options options for the cache
     */
    constructor(options?: CacheOptions);
    /**
     * Set data in cache
     * @param type A type of data (ship, equipment, voiceline, chapter, or barrage)
     * @param raw Raw data in array
     */
    set(type: datatype, raw: any[]): Ships | Equipments | API<Chapter> | API<Voiceline> | Barrages | undefined;
}
