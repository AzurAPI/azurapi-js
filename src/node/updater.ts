// CacheUpdater.ts
/**
 * Functions relating to updating the cache
 * @packageDocumentation
 */
import fs from 'fs';
import { data } from '../core/data';
import { check, fetch } from './updateChecker';
import { EventsTemplate, UpdaterTemplate } from '../types/client';
import { baseFolder, local } from './data';
import { AzurAPIState, Datatype } from '../core/state';
import { ClientOptions } from '../core/client/clientFactory';
import { Ship } from '../types/ship';

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
  let cron: NodeJS.Timeout;
  /**
   * Check for updates then update and load cache
   */
  const update = async (type: Datatype) => {
    const needsUpdate = await check(type);
    if (needsUpdate) return;

    events.emit('updateAvailable', type);

    const strData = await fetch(data[type]);
    const raw = getRawData<Ship>(strData, type);
    state[type].dispatch(`set`, raw);
    fs.writeFileSync(local[type], JSON.stringify(raw));
  };

  /**
   * Start cron job
   */
  const start = () => {
    if (!cron)
      events.emit(
        'debug',
        'Notify for new data updates enabled. AzurAPI Client will check for data updates every hour.'
      );
    if (cron) clearInterval(cron);
    cron = setInterval(() => Object.keys(local).forEach((type: Datatype) => update(type)), options.rate);
  };

  /**
   * Stop cron job
   */
  const stop = () => {
    if (cron) clearInterval(cron);
    cron = undefined;
  };

  /**
   * Check if folder and JSON files exist then load cache
   */
  const init = async () => {
    if (!fs.existsSync(baseFolder)) fs.mkdirSync(baseFolder);
    await load();
    events.emit('ready');
  };

  /**
   * Load the cache
   */
  const load = () => {
    Object.keys(local).forEach((type: Datatype) =>
      fs.existsSync(type)
        ? state[type].dispatch('set', getRawData(fs.readFileSync(type).toString(), type))
        : update(type)
    );
  };

  init().then(start);

  return { update, start, stop, init, load };
};
