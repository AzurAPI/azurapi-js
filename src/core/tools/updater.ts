// CacheUpdater.ts
/**
 * Functions relating to updating the cache
 * @packageDocumentation
 */
import { DatabaseURLs } from '../database';
import { ClientTools, UpdaterTemplate } from '../../types/client';
import { AzurAPIState, Datatype } from '../state';
import { ClientOptions } from '../client/clientFactory';
import { createToolsStore } from '../state/tools';
import { createVersionHandler } from './versionHandler';
import { Events } from '../events';

export type ClientUpdater = ReturnType<typeof createUpdater>;

const areObjects: Datatype[] = ['voicelines'];
export interface UpdaterProps {
  state: AzurAPIState;
  options: ClientOptions;
  tools: ClientTools;
}

const getRawData = <T>(source: T, type: Datatype): T[] | T => {
  try {
    if (areObjects.includes(type)) return source || ({} as T);
    else return Object.values(source || []);
  } catch (error) {
    console.error(source);
  }
};

export const createUpdater = (props: UpdaterProps): UpdaterTemplate => {
  const { state, options } = props;
  const { events, fileManager, fetch, localFiles } = props.tools;
  const store = createToolsStore();
  const versionHandler = createVersionHandler({ store, fileManager, fetch, localFiles });
  let cron: any; // either number or NodeJS.Timeout;

  const updateAllModules = async () => {
    const modulesToUpdate = await versionHandler.getModulesToUpdate();

    await Promise.all(
      versionHandler.supportedModules.map(async (type: Datatype) => {
        const fileExists = fileManager.exists(localFiles.localDatabaseFiles[type]);
        !fileExists && events.emit(Events.debug, `No local database for ${type} found, updating.`);
        if (modulesToUpdate.includes(type) || !fileExists) await updateModule(type);
        else loadModuleIntoStore(type);
      })
    );

    modulesToUpdate.length > 0 && (await versionHandler.updateLocalVersion());
  };

  /**
   * Check for updates then update and load cache
   */
  const updateModule = async (type: Datatype) => {
    events.emit(Events.updateAvailable, type);
    events.emit(Events.debug, `Downloading updated ${type} data`);

    const strData = await fetch(DatabaseURLs[type]);
    const raw = getRawData(strData, type);

    state[type].dispatch(`set`, raw);
    fileManager.write(localFiles.localDatabaseFiles[type], raw);
  };

  /**
   * Start cron job
   */
  const startUpdateInterval = () => {
    if (cron) {
      clearInterval(cron);
    } else {
      const msg = `Notify for new data updates enabled. 
        AzurAPI Updater will try to update every ${options.rate / 60000} mins.`;
      events.emit(Events.debug, msg);
    }
    cron = setInterval(updateAllModules, options.rate);
  };

  /**
   * Stop cron job
   */
  const stopUpdateInterval = () => {
    if (cron) clearInterval(cron);
    cron = undefined;
  };

  /**
   * Check if folder and JSON files exist then load cache
   */
  const init = async () => {
    if (!fileManager.exists(localFiles.baseFolder)) fileManager.mkdir(localFiles.baseFolder);
    const isLatestVersion = await versionHandler.isLatestVersion();
    const versionStateMsg = isLatestVersion ? 'Latest version on local!' : `Updating to new version`;
    isLatestVersion && events.emit(Events.debug, versionStateMsg);
    if (!isLatestVersion) await versionHandler.updateLocalVersion();

    await updateAllModules();
    events.emit(Events.ready);
    events.emit(Events.debug, 'AzurAPIUpdater is ready!');
  };

  /**
   * Load the state fron json database
   */
  const loadModuleIntoStore = (type: Datatype) => {
    events.emit(Events.debug, `Loading store of ${type}`);
    const raw = getRawData(fileManager.read(localFiles.localDatabaseFiles[type]), type);
    state[type].dispatch('set', raw);
  };

  init().then(() => options.autoupdate && startUpdateInterval());

  return { updateModule, updateAllModules, startUpdateInterval, stopUpdateInterval, loadModuleIntoStore };
};
