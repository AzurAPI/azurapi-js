// api.ts
/**
 * Default api function
 * @packageDocumentation
 */

export type Language = 'en' | 'cn' | 'jp' | 'kr';

export interface advancedOptions {
  nameOnly?: boolean;
  idOnly?: boolean;
  language?: Language;
}

export const NATIONS = {
  'Eagle Union': ['uss', 'eagle union'],
  'Royal Navy': ['hms', 'royal navy'],
  'Sakura Empire': ['ijn', 'sakura empire'],
  'Iron Blood': ['kms', 'iron blood'],
  'Dragon Empery': ['pran', 'dragon empery'],
  'Northern Parliament': ['sn', 'northern parliament'],
  'Iris Libre': ['ffnf', 'iris libre'],
  'Vichya Domination': ['mnf', 'vichya domination'],
  'Sardenga Empire': ['rn', 'sardegna empire'],
  Neptunia: ['hdn', 'neptunia'],
  Bilibili: ['bili', 'bilibili'],
  'Venus Vacation': ['venus', 'venus vacation'],
  Utawarerumono: ['utawarerumono'],
  'Kizuna AI': ['kizunaai', 'kizuna ai'],
  Hololive: ['hololive'],
  META: ['meta'],
  Universal: ['universal', 'univ'],
};
