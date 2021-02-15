import Parser from './DataParser';
import Utils from './Utils';
import { local, data } from './Data';
import fetch from 'node-fetch';

type datatype = 'ships' | 'equipments' | 'voicelines' | 'chapters' | 'barrages'
export default class UpdateChecker {
  public datatype;
  public fetched;
  public local = {};
  public remote = {};
  public parse = new Parser();
  constructor() {
    this.datatype = null;
    this.fetched = false;
    this.local = {};
    this.remote = {};
  }

  setType(type: datatype) {
    this.datatype = type;
    return this;
  }

  check() {
    if(!this.fetched) return;
    const data = {
      downloaded: {},
      remote: {}
    };
    for(const { type, version } of this.parse.dataversion('local')) data.downloaded[type] = version;
    for(const { type, version } of this.parse.dataversion('remote')) data.downloaded[type] = version;
    return data;
  }

  async fetch() {
    if(!this.fetched) {
      this.local = JSON.parse(await Utils.readFile(local.version));
      this.remote = await fetch(data.version).then(d => d.json());
      this.fetched = true;
    }
  }

  nolocal() {
    return Object.entries(this.local).length === 0;
  }

  needsupdate() {
    return !this.local[this.datatype] || this.local[this.datatype]['version-number'] !== this.remote[this.datatype]['version-number'] || this.local[this.datatype]['last-data-refresh-date'] !== this.remote[this.datatype]['last-data-refresh-date'] || this.remote !== this.local;
  }

  writeversion() {
    let data;
    if(this.datatype) {
      const inverted = this.datatype === 'ships' ? 'equipments' : 'ships';
      if(this.local[inverted]) {
        data = {
          [this.datatype]: this.remote[this.datatype],
          [inverted]: this.local[inverted]
        };
      } else {
        data = {
          [this.datatype]: this.remote[this.datatype]
        };
      }
    }
    return Utils.writeFile(local.version, JSON.stringify(data || this.remote));
  }
}
