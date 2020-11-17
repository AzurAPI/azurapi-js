import { HttpClient } from '@augu/orchid';
import UnserialisedError from '../errors/UnserialisableError';
const localv = require('../../_v.json');

export default class UpdateChecker {
    private http: HttpClient;
    constructor() {
      this.http = new HttpClient({
        defaults: {
          headers: {
            'Accept': 'application/json'
          }
        }
      });
    }
    async getVersion() {
      const res = await this.http.get('https://raw.githubusercontent.com/0t4u/azurapi-js/v2/_v.json');
      let v: any[] = [];
      try {
        v = res.json();
      } catch(ex) {
        throw new UnserialisedError();
      }
      return v;
    }
    async getDataVersion() {
      const res = await this.http.get('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/version-info.json');
      let v: any[] = [];
      try {
        v = res.json();
      } catch(ex) {
        throw new UnserialisedError();
      }
      return v;
    }
    async checkUpdate() {
      const v = await this.getVersion();
      if (v === localv) {
        return false;
      } else {
        return true;
      }
    }
    async logVersions() {
      const ver = await this.getVersion();
      const dataver = await this.getDataVersion();
      console.log(ver);
      console.log(dataver);
    }
}
const u:UpdateChecker = new UpdateChecker;
u.logVersions();
