// index.ts
/**
 * Exporting everything for package
 * @packageDocumentation
 */

export { AzurAPI } from './core/client/localClass';
export { HieiAzurAPI } from './core/client/hieiClass';
export { AzurAPIClient, GeneratedClientProps } from './core/client/clientFactory';
export { createLocalClient, CoreAPI } from './core/client/localClient';
export { createHieiClient, CoreHieiAPI } from './core/client/hieiClient';
export { EventsTemplate, UpdaterTemplate } from './types/client';
export { Events } from './core/events';
export { createUpdater, UpdaterProps } from './core/tools/updater';
export { getClientTools } from './core/tools/toolsHandler';
export { ClientTools } from './types/client';

import { AzurAPI } from './core/client/localClass';
export const AzurAPIInstance = new AzurAPI();
