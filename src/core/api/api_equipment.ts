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
   * Get equipment by name
   * @param name Equipment name
   * @param languages Language to search
   */
  name(name: string, languages: Language[] = ['en', 'cn', 'jp', 'kr']): Equipment | undefined {
    for (let equipment of this.raw)
      if (
        languages.some(
          lang =>
            equipment.names[lang] && normalize(equipment.names[lang].toUpperCase()) === normalize(name.toUpperCase())
        )
      )
        return equipment;
    return undefined;
  }

  /**
   * Lists the equipments by category
   * @param category name of the category you want to search for
   */
  category(category: string): Equipment[] {
    let results: Equipment[] = [];
    for (let equipment of this.raw)
      if (normalize(equipment.category.toUpperCase() === normalize(category.toUpperCase()))) results.push(equipment);
    return results;
  }

  /**
   * Lists the equipments by nationality
   * @param nationality naitionality name of the equipments you want to search for
   */
  nationality(nationality: string): Equipment[] {
    let results: Equipment[] = [];
    nationality = Object.keys(NATIONS).find(key => NATIONS[key].includes(nationality.toLowerCase())) || nationality;
    for (let equipment of this.raw)
      if (normalize(equipment.nationality.toUpperCase()) === normalize(nationality.toUpperCase()))
        results.push(equipment);
    return results;
  }

  private _nameAll(name: string, languages: Language[] = ['en', 'cn', 'jp', 'kr']): Equipment[] {
    return this.raw.filter(equipment =>
      languages.some(
        lang =>
          equipment.names[lang] && normalize(equipment.names[lang].toUpperCase()) === normalize(name.toUpperCase())
      )
    );
  }

  /**
   * Get equipment using name in any language or id
   * @param query Equipment name in any language or equipment id
   */
  get(query: string, adv?: advancedOptions): Equipment | undefined {
    if (adv) {
      if (adv.idOnly) {
        return this.id(query);
      } else if (adv.nameOnly || (adv.nameOnly && !adv.language)) {
        return this.name(query);
      } else if (adv.nameOnly && adv.language) {
        return this.name(query, [adv.language]);
      }
    } else {
      let fuzeResult = this.fuze(query).sort((a, b) => (b.score || 0) - (a.score || 0))[0];
      return this.id(query) || this.name(query) || (fuzeResult ? fuzeResult.item : undefined);
    }
  }

  /**
   * Get equipment using everything
   * @param query basically anyting i guess
   */
  all(query: string): Equipment[] {
    let results: (Equipment | undefined)[] = [];
    results.push(this.id(query));
    results.push(...this._nameAll(query).filter(i => i));
    results.push(...this.fuze(query).map(i => i.item));
    return results
      .filter((value: Equipment | undefined): value is Equipment => value !== null && value !== undefined)
      .filter((elem, index, self) => index === self.findIndex(el => el.id === elem.id));
  }
}
