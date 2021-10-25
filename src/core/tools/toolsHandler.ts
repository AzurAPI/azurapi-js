import { ClientTools } from '../../types/client';
import { getLocalDatabase, ServerURL } from '../database';
import { ImplHandler, EnvChecker } from '@atsu/multi-env-impl';
import { useFetchAPI } from '../utils/api';

/**
 * We return the clientTools depending on the environment used (browser | node)
 * Basically here we call the ugly transformations to be able to have the same inner code inside.
 * @param state Required by updater, state get/set
 * @param options Required by updater, configuration options
 */
export const getClientTools = (customImpl?: ClientTools) => {
  if (customImpl) return customImpl;

  const sharedOptions = { serverUrl: ServerURL, path: '/' };
  const tools: ClientTools = {
    fileManager: ImplHandler.fileManager,
    events: ImplHandler.events,
    fetchAPI: useFetchAPI({ sharedOptions, fetch: ImplHandler.fetch }),
    localFiles: getLocalDatabase(getPath()),
  };

  return tools;
};

const getPath = () => {
  if (EnvChecker.isNode()) return require('path').join(__dirname, './../');
  return undefined;
};
