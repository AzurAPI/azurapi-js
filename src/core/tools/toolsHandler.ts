import { isNodeEnvironment } from '../../node/utils';
import { ClientTools, EventsTemplate, FetchTemplate } from '../../types/client';
import { GeneratedClientProps } from '../client/clientFactory';
import { getLocalDatabase } from '../database';
import { Events } from '../events';
import { AzurAPIState } from '../state';
import { createUpdater } from './updater';

export interface ClientToolsProps<State> {
  state: State;
  options: Required<GeneratedClientProps>;
}

/**
 * We return the clientTools depending on the environment used (browser | node)
 * Basically here we do the ugly transformations to be able to have the same inner code inside.
 * @param state Required by updater, state get/set
 * @param options Required by updater, configuration options
 */
export const getClientTools = <State>(props: ClientToolsProps<State>, customImpl?: ClientTools) => {
  if (customImpl) return customImpl;
  const isNode = isNodeEnvironment();
  if (isNode) return getToolsOnNode(props);
  else return getToolsOnBrowser(props);
};

const getToolsOnNode = <State>(props: ClientToolsProps<State>): ClientTools => {
  const nodeUtils = require('./../../node/utils');
  nodeUtils.checkSupportedNodeVersion();
  const EventEmitter = require('events');

  const fs = require('fs');
  const fetch: FetchTemplate = require('../../node/http').fetch;
  const path = require('path').join(__dirname, '../../');

  const tools: ClientTools = {
    fileManager: {
      write: (path, data) => fs.writeFileSync(path, JSON.stringify(data)),
      read: path => JSON.parse(fs.readFileSync(path, 'utf8')),
      exists: fs.existsSync,
      mkdir: fs.mkdirSync,
    },
    events: new EventEmitter(),
    fetch: async options => JSON.parse(await fetch(options)),
    updater: null,
    localFiles: getLocalDatabase(path),
  };

  return tools;
};

const getToolsOnBrowser = <State>(props: ClientToolsProps<State>): ClientTools => {
  const target = new EventTarget();

  const events: EventsTemplate = {
    emit: (event: Events, action) => target.dispatchEvent(new CustomEvent(event, { detail: action })),
    on: (event, listener) => {
      target.addEventListener(event, (event: CustomEvent) => listener(event.type, event.detail));
      return events;
    },
    off: (event, listener) => {
      target.removeEventListener(event, (event: CustomEvent) => listener(event.type, event.detail));
      return events;
    },
  };

  const fetchImpl: FetchTemplate = async options => {
    const { method, serverUrl, path, headers, body } = options;
    const url = `${serverUrl}${path}`;
    const fetchOptions: RequestInit = { method, headers, body };
    return await fetch(url, fetchOptions).then(res => res.json());
  };

  const tools: ClientTools = {
    /** Unfortunately on browser we don't support yet the fileManager */
    fileManager: {
      write: (path: string, data: any) => undefined,
      read: (path: string) => ({} as any),
      exists: (path: string) => false,
      mkdir: (path: string) => undefined,
    },
    events,
    fetch: fetchImpl,
    updater: null,
    localFiles: getLocalDatabase(),
  };
  return tools;
};
