// index.ts
/**
 * Exporting everything for package
 * @packageDocumentation
 */

export { AzurAPI } from './core/client/localClass';
export { AzurAPIClient, GeneratedClientProps, createClientFactory } from './core/client/clientFactory';
export { createLocalClient, CoreAPI } from './core/client/localClient';
export { EventsTemplate, UpdaterTemplate, FetchTemplate, FileManager, RequestOptionsTemplate } from './types/client';
export { Events } from './core/events';
export { createSection, Section } from './core/state/stateManager';
export { createUpdater, UpdaterProps } from './core/tools/updater';
export { getClientTools } from './core/tools/toolsHandler';
export { ClientTools } from './types/client';
export { DataSetUtils } from './core/utils/dataset';
export { DataSet } from './types/utils/dataset';
export { FetchAPI, useFetchAPI } from './core/utils/api';

import { AzurAPI } from './core/client/localClass';
export const AzurAPIInstance = new AzurAPI();
