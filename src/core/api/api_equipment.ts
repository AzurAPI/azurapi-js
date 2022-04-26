// api_equipment.ts
/**
 * Extended equipment api functions
 * @packageDocumentation
 */
import { Equipment } from '../../types/equipment';
import API, { Language, normalize, NATIONS, advancedOptions } from './api';
import { AzurAPI } from '../Client';

/**
 * Special equipments class for extended functionality
 */
export class Equipments extends API<Equipment> {
  /**
   * Constructor
   * @param client An AzurAPI instance
   */
  constructor(client: AzurAPI) {
    super(client, ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code', 'id']);
  }

  /**
   * Get by id
   * @param id String of number
   */
  id(id: string): Equipment | undefined {
    for (let item of this.raw) if (normalize(item.id.toUpperCase()) === normalize(id.toUpperCase())) return item;
    return undefined;
  }

  /**
   * Get equipment by name
   * @param name Equipment name
   * @param languages Language to search
   */
  name(name: string, languages: Language[] = ['en', 'cn', 'jp', 'kr']): Equipment[] | [] {
    return this.raw.filter(equipment => languages.some(lang => equipment.names[lang] && normalize(equipment.names[lang].toUpperCase()) === normalize(name.toUpperCase())));
  }

  /**
   * Lists the equipments by category
   * @param category name of the category you want to search for
   */
  category(category: string): Equipment[] | [] {
    return this.raw.filter(equipment => normalize(equipment.category.toUpperCase() === normalize(category.toUpperCase())));
  }

  /**
   * Lists the equipments by nationality
   * @param nationality naitionality name of the equipments you want to search for
   */
  nationality(nationality: string): Equipment[] | [] {
    nationality = Object.keys(NATIONS).find(key => NATIONS[key].includes(nationality.toLowerCase())) || nationality;
    return this.raw.filter(equipment => normalize(equipment.nationality.toUpperCase()) === normalize(nationality.toUpperCase()));
  }

  /**
   * Get equipment using name in any language or id
   * @param query Equipment name in any language or equipment id
   */
  get(query: string): Equipment | Equipment[] {
    let fuzeResult = this.fuze(query).sort((a, b) => (b.score || 0) - (a.score || 0))[0];
    return this.id(query) || this.name(query) || (fuzeResult ? fuzeResult.item : undefined);
  }

  /**
   * Get equipment using everything
   * @param query basically anyting i guess
   */
  all(query: string): Equipment[] | [] {
    let results: (Equipment | undefined)[] = [];
    results.push(this.id(query));
    results.push(...this.name(query).filter(i => i));
    results.push(...this.fuze(query).map(i => i.item));
    return results
      .filter((value: Equipment | undefined): value is Equipment => value !== null && value !== undefined)
      .filter((elem, index, self) => index === self.findIndex(el => el.id === elem.id));
  }
}
