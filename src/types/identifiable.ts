/**
 * Base returnables type
 * @packageDocumentation
 */

// * Important: Every API base type (Ship, Barrage, etc.) should be Identifiable
export interface Identifiable {
  id: string;
}
export interface WithNames extends Identifiable {
  names: {
    en: string;
    cn: string;
    jp: string;
    kr?: string;
  };
}
