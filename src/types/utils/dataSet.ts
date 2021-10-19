export type Dictionary<Type, Key extends string | number | symbol = string> = {
  [key in Key]: Type;
};

export interface DataSet<T> {
  dict: Dictionary<T>;
  array: T[];
}
