// UpdateChecker.ts
/**
 * Check for updates and functions relating to updates
 * @packageDocumentation
 */
import fs from 'fs';
import https from 'https';
import { data } from '../core/data';
import { Datatype } from '../core/state';
import { versionInfo } from './data';

let version;
let remote;

/**
 * Check for updates
 */
export async function check(type: Datatype): Promise<boolean> {
  if (!version && fs.existsSync(versionInfo)) version = JSON.parse(fs.readFileSync(versionInfo).toString());
  remote = JSON.parse(await fetch(data.version));

  return !(version && version[type] && remote[type]['version-number'] === version[type]['version-number']);
}

/**
 * Save the version data
 */
export function save() {
  if (remote) fs.writeFileSync(versionInfo, JSON.stringify((version = remote)));
}

/**
 * Fetch data
 * @param url URL
 */
export function fetch(url: string): Promise<string> {
  return new Promise((resolve, reject) =>
    https
      .get(url, resp => {
        let data = '';
        resp.on('data', chunk => (data += chunk));
        resp.on('end', () => resolve(data));
      })
      .on('error', err => reject(err))
  );
}
