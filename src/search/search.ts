// WORK IN PROGRESS

import { SearchOptions, SearchOptionsDefault, Dataset, ObjLike, MapLike } from './search_typings';
import { /* levenshteinDistance, levenDistRec, */ distance2/*, diceCoefficient*/ } from './compare';

export default class AOSearch {
  public list: MapLike | null = null;
  private dataset: Dataset | null;
  private options: SearchOptions | any; /* TOFIX: workaround */
  private noMatch: boolean | undefined;
  private algorithm: ((a: string, b: string) => number) | any /* TOFIX: dumb workaround */;

  constructor(dataset: Dataset, options: SearchOptions) {
    this.dataset = options.light ? null : dataset;
    this.optionChecks(dataset, options); // run the checks
    this.options = this.mergeObjs(options, SearchOptionsDefault);
    if (this.options.noMatch === 'all') { // define internal options
      this.noMatch = true;
    } else {
      this.noMatch = false;
    }
    if (typeof this.options.algorithm === 'function') { // default or custom
      this.algorithm = this.options.algorithm;
    } else {
      this.algorithm = distance2;
    }
    if (this.options.initialize) this.createList(dataset); // cache the list of objects
  }

  private optionChecks(ds: Dataset, opts: SearchOptions): void {
    if (!ds) throw new Error('ERR_OPTS_MISSING A Dataset is required, but not provided');
    if (ds !instanceof Array || ds !instanceof Object) throw new Error('ERR_OPTS_MARFORMED A Dataset must be an Array or an Object');
    if (!opts.keys) throw new Error('ERR_OPTS_MISSING No keys are specified, but are required');
    if (opts.keys !instanceof Array) throw new Error('ERR_OPTS_MARFORMED Keys option must be an array');
    if (opts.limit && typeof opts.limit !== 'number') throw new Error('ERR_OPTS_MARFORMED Limit option must be a number');
    if (opts.accuracy && typeof opts.accuracy !== 'number') throw new Error('ERR_OPTS_MARFORMED Accuracy option must be a number');
    /* if (opts.noMatch && (opts.noMatch !== 'all' || opts.noMatch !== 'none')) throw new Error('NoMatch option must be a value of \'all\' or \'none\''); */ // TOFIX: another dumb workaround
    if (opts.algorithm && typeof opts.algorithm !== 'function' && /*(opts.algorithm !== 'dice' || opts.algorithm !== 'distance' ||*/ opts.algorithm !== 'distance2'/*)*/) throw new Error('ERR_OPTS_MARFORMED Algorithm option must be a value of '+/*\'dice\', \'distance\', */'\'distance2\' or a function');
  }

  private mergeObjs(a: ObjLike | any, b?: ObjLike | any): ObjLike {
    if (!b) return a;
    const aKeys = Object.keys(a);
    for (const k of aKeys) {
      if (a[k] === null) {
        if (!b[k]) throw new Error(`ERR_MERGE_VARNOTFOUND ${k} not found`);
      }
      if (b[k] === null || b[k] === undefined) b[k] = a[k];
    }
    for (const k in aKeys) {
      if (aKeys.includes(k)) continue;
      delete b[k];
    }
    return b;
  }

  private createList(ds: Dataset): void {
    this.list = new Map<string | number, unknown>();
    this.options.keys.forEach((v: string, i: number) => {
      const entries: unknown[] = [];
      const dataset = typeof ds === 'object' ? Object.values(ds) as any[] : ds as any[]; // TOFIX: workaround for turning everything into array type
      const iterator = dataset.values();
      for (const obj of iterator) {
        if ((typeof obj !== 'undefined' || obj !== null) && (typeof obj[v] !== 'undefined' || obj[v] !== null)) {
          entries.push(obj[v]);
        }
      }
      this.list?.set(v, entries);
    });
  }
}
