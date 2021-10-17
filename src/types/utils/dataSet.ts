export interface Dictionary<T> {
  [key: string]: T;
}

export interface DataSet<T> {
  dict: Dictionary<T>;
  array: T[];
}
