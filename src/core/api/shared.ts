import { Identifiable } from '../../types/identifiable';
import { Dictionary } from '../../types/utils/dataSet';
import { searchAPI } from '../search';
import { advancedOptions, Language, NATIONS } from '../search/definitions';
import { normalize } from '../search/normalize';
import Fuse from 'fuse.js';

const defaultLanguages: Language[] = ['en', 'cn', 'jp', 'kr'];

interface WithNames {
  names: Dictionary<string>;
}
type SearchItem = Identifiable | WithNames;

const matchNormalized = (a: string, b: string): boolean => normalize(a).toUpperCase() === normalize(b.toUpperCase());

const getGeneric = <T>(array: T[]) => {
  const match = (name: string, property: string): T | undefined =>
    array.find(item => item[property] && matchNormalized(item[property], name));

  const matchAll = (name: string, property: string): T[] =>
    array.filter(item => item[property] && matchNormalized(item[property], name));

  return { match, matchAll };
};

const getByNames = <T extends WithNames>(array: T[]) => {
  const match = (name: string, languages: Language[] = defaultLanguages): T | undefined =>
    array.find(item => languages.some(lang => item.names[lang] && matchNormalized(item.names[lang], name)));

  const matchAll = (name: string, languages: Language[] = defaultLanguages): T[] =>
    array.filter(item => languages.some(lang => item.names[lang] && matchNormalized(item.names[lang], name)));

  return { match, matchAll };
};

const getByNationality = <T extends { nationality: string }>(array: T[]) => {
  const matchFilter = (nationality: string): T[] => {
    nationality = Object.keys(NATIONS).find(key => NATIONS[key].includes(nationality.toLowerCase())) || nationality;

    return array.filter(item => matchNormalized(item.nationality, nationality));
  };

  return { matchFilter };
};

const search = <T extends SearchItem>(array: T[], fuse: FuseInstance<T>) => {
  const findItem = (query: string, adv?: advancedOptions): T | undefined => {
    if (adv) {
      if (adv.idOnly && isIdentifiable(array)) return searchAPI(array).id(query) as T;
      else if (adv.nameOnly && hasNames(array)) {
        if (adv.language) {
          return getByNames(array).match(query, [adv.language]) as T;
        } else {
          return getByNames(array).match(query) as T;
        }
      }
    } else {
      if (isIdentifiable(array)) return searchAPI(array).id(query) as T;
      else if (hasNames(array)) return getByNames(array).match(query) as T;
      else {
        let fuzeResult = fuse(query).sort((a, b) => (b.score || 0) - (a.score || 0))[0];

        return fuzeResult ? fuzeResult.item : undefined;
      }
    }
  };

  const findAll = (query: string): T[] => {
    let results: (T | undefined)[] = [];

    if (isIdentifiable(array)) results.push(searchAPI(array).id(query) as T);
    if (hasNames(array)) results.push(...(getByNames(array).matchAll(query) as T[]));
    results.push(...fuse(query).map(i => i.item));

    /*return results
      .filter((value: T | undefined): value is T => value !== null && value !== undefined)
      .filter((elem, index, self) => index === self.findIndex(el => el.id === elem.id));*/

    return results;
  };

  return { findAll, findItem };
};

export const SharedAPI = {
  getGeneric,
  getByNames,
  matchNormalized,
  getByNationality,
  search,
};

const isIdentifiable = (arr: SearchItem[]): arr is Identifiable[] => {
  if (Array.isArray(arr)) return false;
  return !!(arr[0] as Identifiable).id;
};

const hasNames = (arr: SearchItem[]): arr is WithNames[] => {
  if (Array.isArray(arr)) return false;
  return !!(arr[0] as WithNames).names;
};

export type FuseInstance<T> = (query: string) => Fuse.FuseResult<T>[];
