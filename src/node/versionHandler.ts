// UpdateChecker.ts
/**
 * Check for updates and functions relating to updates
 * @packageDocumentation
 */
import fs from 'fs';
import { DatabaseURLs } from '../core/database';
import { Datatype } from '../core/state';
import { versionInfoFile } from './data';
import { fetch } from './http';
import { ToolsStore, VersionState } from './state';

export const createVersionHandler = ({ versionSection }: ToolsStore) => {
  const { state, dispatch } = versionSection;
  const supportedModules: Datatype[] = ['ships', 'equipments', 'chapters', 'barrages', 'voicelines'];

  const saveToFile = <T>(value: T, path: string) => {
    fs.writeFileSync(path, JSON.stringify(value));
  };

  const getLatestVersion = async () => JSON.parse(await fetch(DatabaseURLs.version)) as VersionState;

  const updateLocalVersion = async () => {
    const newVersion = await getLatestVersion();

    dispatch('setVersion', newVersion);
    saveToFile(newVersion, versionInfoFile);
    return newVersion;
  };

  const getLocalVersion = () =>
    (fs.existsSync(versionInfoFile) && (JSON.parse(fs.readFileSync(versionInfoFile).toString()) as VersionState)) ||
    (state.version['version-number'] && state.version) ||
    null;

  /**
   * Check for updates
   */
  const getModulesToUpdate = async (): Promise<Datatype[]> => {
    const currentVersion = getLocalVersion();
    let modulesToUpdate: Datatype[] = [];

    if (currentVersion) {
      const latestVersion = await getLatestVersion();
      supportedModules.forEach(type => {
        if (latestVersion[type]['version-number'] !== currentVersion[type]['version-number']) {
          modulesToUpdate.push(type);
        }
      });
    } else {
      await updateLocalVersion();
      modulesToUpdate = supportedModules; // We set that everything needs update when theres no version info
    }
    return modulesToUpdate;
  };

  const isLatestVersion = async (): Promise<boolean> => {
    const currentVersion = getLocalVersion();

    if (!currentVersion) return false;

    const latestVersion = await getLatestVersion();

    return latestVersion['version-number'] === currentVersion['version-number'];
  };

  return { isLatestVersion, getModulesToUpdate, updateLocalVersion, supportedModules };
};
