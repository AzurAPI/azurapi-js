// UpdateChecker.ts
/**
 * Check for updates and functions relating to updates
 * @packageDocumentation
 */
import { DatabaseURLs, LocalFiles } from '../database';
import { Datatype } from '../state';
import { FileManager } from '../../types/client';
import { ToolsStore, VersionState } from '../state/tools';
import { FetchAPI } from '../utils/api';

interface VersionHandlerProps {
  store: ToolsStore;
  fileManager: FileManager;
  localFiles: LocalFiles;
  fetchAPI: FetchAPI;
}

export const createVersionHandler = (props: VersionHandlerProps) => {
  const { fileManager, fetchAPI, localFiles } = props;
  const { state, dispatch } = props.store.versionSection;
  const supportedModules: Datatype[] = ['ships', 'equipments', 'chapters', 'barrages', 'voicelines'];

  const getLatestVersion = async () => await fetchAPI.get<VersionState>({ path: DatabaseURLs.version });

  const updateLocalVersion = async () => {
    const newVersion = await getLatestVersion();

    dispatch('setVersion', newVersion);
    fileManager.write(localFiles.versionInfoFile, newVersion);
    return newVersion;
  };

  const getLocalVersion = () => {
    if (fileManager.exists(localFiles.versionInfoFile)) {
      return fileManager.read<VersionState>(localFiles.versionInfoFile);
    } else if (state.version['version-number']) {
      return state.version;
    }
    return null;
  };
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
