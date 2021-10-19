// index.ts
/**
 * Exporting everything for package
 * @packageDocumentation
 */

import EventEmitter from 'events';
import { createUpdater, UpdaterProps } from './node/updater';
import { EventsTemplate, UpdaterTemplate } from './types/client';
import { checkSupportedNodeVersion } from './node/utils';
import { AzurAPI } from './core/client/class';

checkSupportedNodeVersion();

const events: EventsTemplate = new EventEmitter();
export const AzurAPIInstance = new AzurAPI({ events }).withUpdater(createUpdater);

export { Events } from './node/data';
export { createUpdater, UpdaterProps };
export { EventsTemplate, UpdaterTemplate };
