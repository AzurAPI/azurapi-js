// index.ts
/**
 * Exporting everything for package
 * @packageDocumentation
 */

import EventEmitter from 'events';
import { initUpdater } from './node/updater';
import { EventsTemplate, UpdaterTemplate } from './types/client';
import { AzurAPI } from './core/client/class';
import { checkSupportedNodeVersion } from './node/utils';

checkSupportedNodeVersion();

const events: EventsTemplate = new EventEmitter();
const updater: UpdaterTemplate = initUpdater(events);

export const AzurAPIClient = new AzurAPI({ events, updater });
export { initUpdater };
export { EventsTemplate, UpdaterTemplate };
