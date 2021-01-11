type InferValue<Prop extends PropertyKey, Desc> =
  Desc extends { get(): any, value: any } ? never :  
  Desc extends { value: infer T } ? Record<Prop, T> : 
  Desc extends { get(): infer T } ? Record<Prop, T> : never;

type DefineProperty<
  Prop extends PropertyKey,
  Desc extends PropertyDescriptor> =    
    Desc extends { writable: any, set(val: any): any } ? never :
    Desc extends { writable: any, get(): any } ? never :
    Desc extends { writable: false } ? Readonly<InferValue<Prop, Desc>> :
    Desc extends { writable: true } ? InferValue<Prop, Desc> :
    Readonly<InferValue<Prop, Desc>>
/**
 * Extention to the built in Object.defineProperty() method.
 * @param obj Object on which to add or modify the property.
 * @param prop The property name.
 * @param val Object value and/or writable option.
 */
export function defineProperty<
  // eslint-disable-next-line @typescript-eslint/ban-types
  Obj extends object,
  Key extends PropertyKey,
  PDesc extends PropertyDescriptor> 
(obj: Obj, prop: Key, val: PDesc): 
    asserts  obj is Obj & DefineProperty<Key, PDesc> {
  Object.defineProperty(obj, prop, val);
}
