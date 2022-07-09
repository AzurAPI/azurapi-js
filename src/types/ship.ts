// ship.ts
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

type Url = string;
type Stat =
  | 'health'
  | 'armor'
  | 'reload'
  | 'luck'
  | 'firepower'
  | 'torpedo'
  | 'evasion'
  | 'speed'
  | 'antiwar'
  | 'aviation'
  | 'oilConsumption'
  | 'accuracy'
  | 'antisubmarineWarfare'
  | 'oxygen'
  | 'ammunition'
  | 'huntingRange';
type Rarity = 'Normal' | 'Rare' | 'Epic' | 'Super Rare' | 'Ultra Rare' | 'Priority' | 'Decisive';
type LimitBreaks = string[];

export interface Ship extends Identifiable {
  wikiUrl: Url; // An valid, full url to its wiki page
  names: {
    // Ship's name
    code: string;
    en: string;
    cn: string;
    jp: string;
    kr: string;
  };
  thumbnail: Url;
  hexagon: [number, number, number, number, number, number];
  class: string; // Ship's class
  nationality: string; // Ship's nationality
  hullType: string; // Ship type (Destroyer etc)
  rarity: Rarity; // Super Rare, hopefully
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
  enhanceValue: Map<Stat, number>; // <stat type>: <enhance value>
  scrapValue: {
    coin: number;
    oil: number;
    medal: number;
  };
  skills: Skill[];
  skins: Skin[];
  gallery: GalleryItem[];
  limitBreaks: LimitBreaks[]; // first layer = breaks, second layer = bonus
  fleetTech: {
    // fleet tech stuff
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
  retrofit: boolean; // if the ship is retrofittable
  retrofitId: string; // the id after retrofit
  retrofitHullType: string; // if the ship changes type
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
    obtainedFrom: string; // source, etc "Available in Medal Exchange for \"Medal\" 80."
    fromMaps: string[]; // map ids, etc "1-1" "10-2"
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
  // on collection
  applicable: string[]; // applicable ship types (i.e. Destroyer)
  stat: Stat; // name of stat to enhance
  bonus: string; // human-readable version of how much to enhance
}

type Stats = Map<Stat, string | ('' | '*' | '0' | '1' | '2' | '3' | '4' | '5' | '6')[][]>;

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
  cn?: Url; // censored
  bg?: Url; // with background
  background: Url; // scenery background
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
  description: string; // self-explanatory
  url: Url; // the image url
}

interface Artist {
  name: string;
  url: Url;
}

type ProjectID = string;
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
