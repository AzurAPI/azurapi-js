// UpdateChecker.ts
/**
 * Check for updates and functions relating to updates
 * @packageDocumentation
 */
import { datatype, versionInfo, getDataUrl } from './Data';
import fs from 'fs';
import fetch from 'node-fetch';

const supported = ['ships', 'equipments', 'chapters', 'barrages', 'voicelines'];

let version;
let remote;

/**
 * Check for updates
 */
export async function check(): Promise<datatype[]> {
  if (!version && fs.existsSync(versionInfo))
    version = JSON.parse(fs.readFileSync(versionInfo).toString());
  const response = await fetch(getDataUrl('version'));
  remote = await response.json();
  let needUpdate: datatype[] = [];
  for (let type of supported)
    if (
      !(
        version &&
        version[type] &&
        remote[type]['version-number'] === version[type]['version-number']
      )
    )
      needUpdate.push(type as datatype);
  return needUpdate;
}

/**
 * Save the version data
 */
export function save() {
  if (remote) fs.writeFileSync(versionInfo, JSON.stringify((version = remote)));
}
