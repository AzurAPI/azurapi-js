// chapter.ts
/**
 * Chapter types
 * @packageDocumentation
 */

import { Identifiable } from './identifiable';

interface Reward {
  item: string;
  count?: number;
}

interface Node {
  x: number;
  y: number;
  node: string;
}

export interface Chapter extends Identifiable {
  1: SubChapter;
  2: SubChapter;
  3: SubChapter;
  4: SubChapter;
  names: {
    en: string;
    cn: string;
    jp: string;
  };
  normal: {
    code: string
  }
}

export interface SubChapter extends Identifiable {
  names: {
    en: string;
    cn: string;
    jp: string;
  };
  normal: {
    title: string;
    code: string;
    introduction: string;
    unlockRequirements: {
      text: string;
      requiredLevel: number;
    };
    clearRewards: {
      cube: number;
      coin: number;
      ship: string;
    };
    threeStarRewards: Reward[];
    enemyLevel: {
      mobLevel: number;
      bossLevel: number;
      boss: string;
    };
    baseXP: {
      smallFleet: number;
      mediumFleet: number;
      largeFleet: number;
      bossFleet: number;
    };
    requiredBattles: number;
    bossKillsToClear: number;
    starConditions: string[];
    airSupremacy: {
      actual: number;
      superiority: number;
      supremacy: number;
    };
    mapDrops: string[];
    equipmentBlueprintDrops: string[];
    shipDrops: string[];
    nodeMap: {
      width: number;
      height: number;
      map: any[];
      nodes: Node[];
    };
  };
  hard: {
    title: string;
    code: string;
    introduction: string;
    unlockRequirements: {
      text: string;
      requiredLevel: number;
    };
    threeStarRewards: Reward[];
    enemyLevel: {
      mobLevel: number;
      bossLevel: number;
      boss: string;
    };
    baseXP: {
      smallFleet: number;
      mediumFleet: number;
      largeFleet: number;
      bossFleet: number;
    };
    requiredBattles: number;
    bossKillsToClear: number;
    starConditions: string[];
    airSupremacy: {
      actual: number;
      superiority: number;
      supremacy: number;
    };
    fleetRestrictions: {
      fleet1: object;
      fleet2: object;
    };
    statRestrictions: {
      averageLevel: number;
      firepower: number;
      aviation: number;
    };
    mapDrops: string[];
    equipmentBlueprintDrops: string[];
    shipDrops: string[];
    nodeMap: {
      width: number;
      height: number;
      map: any[];
      nodes: Node[];
    };
  };
}
