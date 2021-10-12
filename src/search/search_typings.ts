export interface SearchOptions extends QueryOptions {
  keys: string[] | null;
  noMatch?: 'all' | 'none';
  algorithm?: /* 'dice' | 'distance' | */ 'distance2' | ((a: string, b: string) => number);
  initialize?: boolean;
  light?: boolean;
}

export interface QueryOptions {
  limit?: number;
  accuracy?: number;
}

export const SearchOptionsDefault: SearchOptions = {
  keys: null,
  limit: 5,
  accuracy: 10,
  noMatch: 'all',
  algorithm: 'distance2',
  initialize: true,
  light: false,
};

export const QueryOptionsDefault: QueryOptions = {
  limit: 5,
  accuracy: 10,
};

export type Dataset = any[] | Record<string, unknown>;
export type ObjLike = Record<string, unknown>;
export type MapLike = Map<string | number, unknown>;

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type Immutable<T> = {
  +readonly [P in keyof T]: T[P];
};
