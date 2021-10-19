import { Dictionary, DataSet } from '../../types/utils/dataSet';

export const DataSetUtils = {
  /**
   * This creates a dictionary from an specified array and key as index type
   * e.g. arr: {id: string}[], key: "id" --> dict{[id]: {id: string}}
   */
  createDictionary: <T>(array: T[], key: string) => {
    let dict: Dictionary<T> = {};
    array.forEach(val => (dict[val[key]] = val));
    return dict;
  },

  createArray: <T>(dictionary: Dictionary<T>, mappingFn = (key: string): T => dictionary[key]): T[] =>
    Object.keys(dictionary).map(mappingFn),
};
