// CacheUpdater.ts
/**
 * Functions relating to updating the cache
 * @packageDocumentation
 */
import fs from 'fs';
import { data } from '../core/data';
import { check, fetch } from './updateChecker';
import { EventsTemplate } from '../types/client';
import { baseFolder, local } from './data';

export type ClientUpdater = ReturnType<typeof createUpdater>;
export const createUpdater = (events: EventsTemplate) => {
  let cron: NodeJS.Timeout;
  /**
   * Check for updates then update and load cache
   */
  const update = () => {
    return check().then(updates => {
      if (updates.length > 0) {
        events.emit('updateAvalible', updates);
        return Promise.all(
          updates.map(async type => {
            let raw = Object.values(JSON.parse(await fetch(data[type])) || []);
            //       client.set(type, raw); Set to state
            fs.writeFileSync(local[type], JSON.stringify(raw));
          })
        );
      }
    });
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
    //cron = setInterval(() => update(), client.rate);
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
    for (let i = 0; i < Object.keys(local).length; i++) {
      let key = Object.keys(local)[i];
      if (!fs.existsSync(local[key])) return update();

      //events.set(key as datatype, Object.values(JSON.parse(fs.readFileSync(local[key]).toString()) || []));
    }
  };

  return { update, start, stop, init, load };
};

export const initUpdater = (events: EventsTemplate) => {
  const updater = createUpdater(events);

  updater.init();

  updater.start();

  return updater;
};
