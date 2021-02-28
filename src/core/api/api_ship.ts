import { Ship } from '../../types/ship';
import API, { Language, normalize } from './api';
import { AzurAPI } from '../../Client';

const NATIONS = {
  'Eagle Union': ['uss', 'eagle union'],
  'Royal Navy': ['hms', 'royal navy'],
  'Sakura Empire': ['ijn', 'sakura empire'],
  'Iron Blood': ['kms', 'iron blood'],
  'Dragon Empery': ['pran', 'dragon empery'],
  'Northern Parliament': ['sn', 'northern parliament'],
  'Iris Libre': ['ffnf', 'iris libre'],
  'Vichya Domination': ['mnf', 'vichya domination'],
  'Sardenga Empire': ['rn', 'sardegna empire'],
  'Neptunia': ['hdn', 'neptunia'],
  'Bilibili': ['bili', 'bilibili'],
  'Venus Vacation': ['venus', 'venus vacation'],
  'Utawarerumono': ['utawarerumono'],
  'Kizuna AI': ['kizunaai', 'kizuna ai'],
  'Hololive': ['hololive'],
  'META': ['meta'],
  'Universal': ['universal', 'univ']
};

class Ships extends API<Ship> {

  constructor(client: AzurAPI) {
    super(client, ['names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code', 'id']);
  }

  name(name: string, languages: Language[] = ['en', 'cn', 'jp', 'kr']): Ship | undefined {
    for (let ship of this.raw) if (languages.some(lang => ship.names[lang] && normalize(ship.names[lang].toUpperCase()) === normalize(name.toUpperCase()))) return ship;
    return undefined;
  }

  hull(hull: string): Ship[] {
    return this.raw.filter(ship =>
      (ship.hullType && normalize(ship.hullType.toUpperCase()) === normalize(hull.toUpperCase())) ||
            (ship.retrofitHullType && normalize(ship.retrofitHullType.toUpperCase()) === normalize(hull.toUpperCase()))
    );
  }

  nationality(nationality: string): Ship[] {
    let results: Ship[] = [];
    nationality = Object.keys(NATIONS).find(key => NATIONS[key].includes(nationality.toLowerCase())) || nationality;
    for (let ship of this.raw) if (normalize(ship.nationality.toUpperCase()) === normalize(nationality.toUpperCase())) results.push(ship);
    return results;
  }

  _nameAll(name: string, languages: Language[] = ['en', 'cn', 'jp', 'kr']): Ship[] {
    return this.raw.filter(ship => languages.some(lang => ship.names[lang] && normalize(ship.names[lang].toUpperCase()) === normalize(name.toUpperCase())));
  }

  get(query: string): Ship | undefined {
    let fuzeResult = this.fuze(query).sort((a, b) => (b.score || 0) - (a.score || 0))[0];
    return this.id(query) || this.name(query) || (fuzeResult ? fuzeResult.item : undefined);
  }

  getAll(query: string): Ship[] {
    let results: (Ship | undefined)[] = [];
    results.push(this.id(query));
    results.push(...this._nameAll(query).filter(i => i));
    results.push(...this.fuze(query).map(i => i.item));
    return results
      .filter((value: Ship | undefined): value is Ship => value !== null && value !== undefined)
      .filter((elem, index, self) => index === self.findIndex(el => el.id === elem.id));
  }
}

export { Ships, NATIONS };
