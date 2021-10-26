// CacheUpdater.ts
/**
 * Functions relating to updating the cache
 * @packageDocumentation
 */
import { DatabaseURLs, LocalFiles } from '../database';
import { UpdaterTemplate } from '../../types/client';
import { Datatype } from '../state';
import { VersionHandler } from './versionHandler';
import { Events } from '../events';
import { Voiceline, VoicelineResponse } from '../../types/voiceline';
import { EventsTemplate, FileManager } from '@atsu/multi-env-impl';
import { FetchAPI } from '../..';
import { ClientOptions } from '../../types/client/client';

export type ClientUpdater = ReturnType<typeof createUpdater>;
export interface UpdaterProps {
  fileManager: FileManager;
  versionHandler: VersionHandler;
  localFiles: LocalFiles;
  events: EventsTemplate;
  fetchAPI: FetchAPI;
  options: ClientOptions;
  onUpdate: <T>(type: Datatype, value: T[]) => void;
}

// ! Voiceline flattening to achieve Voiceline[], maybe we should export VoicelineResponse already on this state.
const getVoicelinesAsArray = (source: VoicelineResponse): Voiceline[] => {
  let acc: Voiceline[] = [];
  for (let id in source) {
    for (let skin in source[id]) {
      for (let voicelineId in source[id][skin]) {
        acc.push({ id, skin, ...source[id][skin][voicelineId] });
      }
    }
  }
  return acc;
};

export const createUpdater = (props: UpdaterProps): UpdaterTemplate => {
  const { versionHandler, fileManager, localFiles, events, fetchAPI, options, onUpdate } = props;
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
  const updateModule = async <T>(type: Datatype) => {
    events.emit(Events.updateAvailable, type);
    events.emit(Events.debug, `Downloading updated ${type} data`);

    const res = await fetchAPI.get({ path: DatabaseURLs[type] });
    const raw = (type === 'voicelines' ? getVoicelinesAsArray(res as VoicelineResponse) : res) as T[];

    onUpdate(type, raw);
    events.emit(Events.debug, `Writing ${type} onto ${localFiles.localDatabaseFiles[type]}`);
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
  const loadModuleIntoStore = <T>(type: Datatype) => {
    events.emit(Events.debug, `Loading store of ${type}`);
    const raw = fileManager.read(localFiles.localDatabaseFiles[type]) as T[];
    onUpdate(type, raw);
  };

  init().then(() => options.autoupdate && startUpdateInterval());

  return { updateModule, updateAllModules, startUpdateInterval, stopUpdateInterval, loadModuleIntoStore };
};
