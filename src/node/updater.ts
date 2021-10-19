// CacheUpdater.ts
/**
 * Functions relating to updating the cache
 * @packageDocumentation
 */
import fs from 'fs';
import { DatabaseURLs } from '../core/database';
import { EventsTemplate, UpdaterTemplate } from '../types/client';
import { baseFolder, Events, localDatabase } from './data';
import { AzurAPIState, Datatype } from '../core/state';
import { ClientOptions } from '../core/client/clientFactory';
import { fetch } from './http';
import { createToolsStore } from './state';
import { createVersionHandler } from './versionHandler';

export type ClientUpdater = ReturnType<typeof createUpdater>;

const areObjects: Datatype[] = ['voicelines'];
export interface UpdaterProps {
  events: EventsTemplate;
  state: AzurAPIState;
  options: ClientOptions;
}

const JSONUtils = (source: string) => {
  const getArray = <T>(): T[] => Object.values(JSON.parse(source) || []);
  const getObject = <T>(): T => JSON.parse(source) || {};
  return { getArray, getObject };
};

const getRawData = <T>(source: string, type: Datatype): T[] | T =>
  areObjects.includes(type) ? JSONUtils(source).getObject() : JSONUtils(source).getArray();

export const createUpdater = (props: UpdaterProps): UpdaterTemplate => {
  const { events, state, options } = props;
  const toolsStore = createToolsStore();
  const versionHandler = createVersionHandler(toolsStore);
  let cron: NodeJS.Timeout;

  const updateAllModules = async () => {
    const modulesToUpdate = await versionHandler.getModulesToUpdate();

    await Promise.all(
      versionHandler.supportedModules.map(async (type: Datatype) => {
        const fileExists = fs.existsSync(localDatabase[type]);
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
    fs.writeFileSync(localDatabase[type], JSON.stringify(raw));
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
    if (!fs.existsSync(baseFolder)) fs.mkdirSync(baseFolder);
    const isLatestVersion = await versionHandler.isLatestVersion();
    const versionStateMsg = isLatestVersion
      ? 'Latest version on local!'
      : `New version detected, updating to new version`;
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
    const raw = getRawData(fs.readFileSync(localDatabase[type]).toString(), type);
    state[type].dispatch('set', raw);
  };

  init().then(() => options.autoupdate && startUpdateInterval());

  return { updateModule, updateAllModules, startUpdateInterval, stopUpdateInterval, loadModuleIntoStore };
};
