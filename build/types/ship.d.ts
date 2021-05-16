/**
 * Ship types
 * @packageDocumentation
 */
import { Identifiable } from './identifiable';
export interface shipAdvancedOptions {
    nameOnly?: boolean;
    idOnly?: boolean;
    language?: string;
}
declare type Url = string;
declare type Stat = 'health' | 'armor' | 'reload' | 'luck' | 'firepower' | 'torpedo' | 'evasion' | 'speed' | 'antiwar' | 'aviation' | 'oilConsumption' | 'accuracy' | 'antisubmarineWarfare' | 'oxygen' | 'ammunition' | 'huntingRange';
declare type Rarity = 'Normal' | 'Rare' | 'Epic' | 'Super Rare' | 'Ultra Rare' | 'Priority' | 'Decisive';
declare type LimitBreaks = string[];
export interface Ship extends Identifiable {
    wikiUrl: Url;
    names: {
        code: string;
        en: string;
        cn: string;
        jp: string;
        kr: string;
    };
    thumbnail: Url;
    hexagon: [number, number, number, number, number, number];
    class: string;
    nationality: string;
    hullType: string;
    rarity: Rarity;
    stars: {
        stars: string;
        value: number;
    };
    stats: {
        baseStats: Stats;
        level100: Stats;
        level120: Stats;
        level100Retrofit?: Stats;
        level120Retrofit?: Stats;
    };
    slots: [Slot, Slot, Slot];
    enhanceValue: Map<Stat, number>;
    scrapValue: {
        coin: number;
        oil: number;
        medal: number;
    };
    skills: Skill[];
    skins: Skin[];
    gallery: GalleryItem[];
    limitBreaks: LimitBreaks[];
    fleetTech: {
        statsBonus: {
            collection?: Bonus;
            maxLevel?: Bonus;
        };
        techPoints: {
            collection: number;
            maxLimitBreak: number;
            maxLevel: number;
            total: number;
        };
    };
    retrofit: boolean;
    retrofitId: string;
    retrofitHullType: string;
    retrofitProjects: Map<ProjectID, RetrofitProject>;
    construction: {
        constructionTime: string;
        availableIn: {
            light: boolean;
            heavy: boolean;
            aviation: boolean;
            limited: boolean;
            exchange: boolean;
        };
    };
    obtainedFrom: {
        obtainedFrom: string;
        fromMaps: string[];
    };
    misc: {
        artist?: Artist;
        web?: Artist;
        pixiv?: Artist;
        twitter?: Artist;
        voice?: Artist;
    };
}
interface Bonus {
    applicable: string[];
    stat: Stat;
    bonus: string;
}
declare type Stats = Map<Stat, string | ('' | '*' | '0' | '1' | '2' | '3' | '4' | '5' | '6')[][]>;
interface Slot {
    type: string;
    minEfficiency: number;
    maxEfficiency: number;
}
interface Skill {
    icon: Url;
    names: {
        en: string;
        cn: string;
        jp: string;
    };
    description: string;
    color: string;
}
interface Skin {
    name: string;
    chibi: Url;
    image: Url;
    cn?: Url;
    bg?: Url;
    background: Url;
    info: {
        enClient?: string;
        cnClient?: string;
        jpClient?: string;
        cost?: string;
        obtainedFrom: string;
        live2dModel: boolean;
    };
}
interface GalleryItem {
    description: string;
    url: Url;
}
interface Artist {
    name: string;
    url: Url;
}
declare type ProjectID = string;
interface RetrofitProject {
    name: ProjectID;
    attributes: string[];
    materials: string[];
    coins: number;
    level: number;
    levelBreakLevel: number;
    levelBreakStars: string;
    recurrence: number;
    require: ProjectID[];
}
export {};
