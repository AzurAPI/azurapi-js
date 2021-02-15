import { local } from './Data';
import fs from 'fs';
import https from 'https';

export type datatype = 'ships' | 'equipments' | 'voicelines' | 'chapters' | 'barrages';
const supported = ['ships', 'equipments'];

let version;
let remote;

export async function checkForUpdates(): Promise<datatype[]> {
  if (!version && fs.existsSync(local.version)) version = JSON.parse(fs.readFileSync(local.version).toString());
  remote = JSON.parse(await fetch(local.version));
  let needUpdate: datatype[] = [];
  for (let type of supported) if (!(version && version[type] && remote[type]['version-number'] === version[type]['version-number'])) needUpdate.push(type as datatype);
  return needUpdate;
}

export function save() {
  if (remote) fs.writeFileSync(local.version, JSON.stringify(version = remote));
}

export function fetch(url: string): Promise<string> {
  return new Promise((resolve, reject) => https.get(url, (resp) => {
    let data = '';
    resp.on('data', chunk => data += chunk);
    resp.on('end', () => resolve(data));
  }).on('error', err => reject(err)));
}
