// index.ts
/**
 * Exporting everything for package
 * @packageDocumentation
 */

export { AzurAPI } from './core/client/class';
export { Client, CreateClientProps } from './types/client/client';
export { createLocalClient, CoreAPI } from './core/client/client';
export { ClientTools, UpdaterTemplate } from './types/client';
export { Events } from './core/events';
export { createUpdater, UpdaterProps } from './core/tools/updater';
export { getClientTools } from './core/tools/toolsHandler';
export { DataSetUtils } from './core/utils/dataset';
export { DataSet } from './types/utils/dataset';
export { FetchAPI, useFetchAPI, FetchAPIProps } from './core/utils/api';
export { SharedAPI, isIdentifiable, hasNames } from './core/api/shared';
export { Identifiable, WithNames } from './types/identifiable';

import { AzurAPI } from './core/client/class';
export const AzurAPIInstance = new AzurAPI();
