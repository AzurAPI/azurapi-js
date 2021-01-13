export default class Parser {
  version(prop: string, type: string) {
    let version = this[prop][type];
    version = version &&['version-number'] ? version['version-number'] : 'Unknown';
    return { type, version };
  }
  dataversion(prop: string) {
    return ['ships', 'equipments'/*, 'chapters', 'voice-lines', 'barrage'*/].map(t => this.version(prop, t));
  }

}
