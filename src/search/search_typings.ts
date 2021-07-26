export interface SearchOptions {
  keys: string[] | null,
  limit?: number,
  accuracy?: number,
  noMatch?: 'all' | 'none',
  algorithm?: /* 'dice' | 'distance' | */ 'distance2' | ((a: string, b: string) => number),
  initialize?: boolean,
  light?: boolean
}

export const SearchOptionsDefault: SearchOptions = {
  keys: null,
  limit: 5,
  accuracy: 10,
  noMatch: 'all',
  algorithm: 'distance2',
  initialize: true,
  light: false
};

export type Dataset = any[] | Record<string, unknown>;
export type ObjLike = Record<string, unknown>;
export type MapLike = Map<string | number, unknown>;
