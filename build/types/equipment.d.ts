/**
 * Equipment types
 * @packageDocumentation
 */
import { Identifiable } from './identifiable';
declare type Url = string;
declare type Category = 'Destroyer Guns' | 'Light Cruiser Guns' | 'Heavy Cruiser Guns' | 'Large Cruiser Guns' | 'Battleship Guns' | 'Ship Torpedoes' | 'Submarine Torpedoes' | 'Fighter Planes' | 'Dive Bomber Planes' | 'Torpedo Bomber Planes' | 'Seaplanes' | 'Anti-Air Guns' | 'Auxiliary Equipment' | 'Cargo' | 'Anti-Submarine Equipment';
interface Fits {
    destroyer: string;
    lightCruiser: string | null;
    heavyCruiser: string | null;
    monitor: string | null;
    largeCruiser: string | null;
    battleship: string | null;
    battlecruiser: string | null;
    aviationBattleship: string | null;
    aircraftCarrier: string | null;
    lightCarrier: string | null;
    repairShip: string | null;
    munitionShip: string | null;
    submarine: string | null;
    submarineCarrier: string | null;
}
interface Tier {
    tier: 'T0' | 'T1' | 'T2' | 'T3';
    rarity: '';
    stars: {
        stars: '*' | '**' | '***' | '****' | '*****' | '******';
        value: 1 | 2 | 3 | 4 | 5 | 6;
    };
    stats: {
        firepower: {
            type: string;
            value: string;
            formatted: string;
        };
        antiair: {
            type: string;
            value: string;
            formatted: string;
        };
        damage: {
            type: string;
            min: string;
            max: string;
            multiplier: string;
            formatted: string;
        };
        oPSDamageBoost: {
            type: string;
            min: string;
            max: string;
            formatted: string;
        };
        rateOfFire: {
            type: string;
            min: string;
            max: string;
            per: string;
            formatted: string;
        };
        spread: {
            type: string;
            value: string;
            unit: string;
            formatted: string;
        };
        angle: {
            type: string;
            value: string;
            unit: string;
            formatted: string;
        };
        range: {
            type: string;
            firing: number;
            shell: number;
            formatted: string;
        };
        volley: {
            type: string;
            multiplier: string;
            count: string;
            unit: string;
            formatted: string;
        };
        volleyTime: {
            type: string;
            value: string;
            unit: string;
            formatted: string;
        };
        coefficient: {
            type: string;
            min: string;
            max: string;
            formatted: string;
        };
        ammoType: {
            type: string;
            value: string;
            unit: string;
            formatted: string;
        };
        characteristic: {
            type: string;
            value: string;
            formatted: string;
        };
    };
}
export interface Equipment extends Identifiable {
    wikiUrl: Url;
    category: Category;
    names: {
        en: string;
        cn: string;
        jp: string;
        kr: string;
    };
    type: {
        focus: string;
        name: string;
    };
    nationality: string;
    image: Url;
    fits: Fits;
    misc: {
        obtainedFrom: string;
        animation: Url;
    };
    tiers: {
        T0?: Tier;
        T1?: Tier;
        T2?: Tier;
        T3?: Tier;
    };
}
export {};
