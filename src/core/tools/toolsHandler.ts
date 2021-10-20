import { platformChecker } from '../../node/utils';
import { ClientTools, EventsTemplate, Fetch } from '../../types/client';
import { GeneratedClientProps } from '../client/clientFactory';
import { getLocalDatabase } from '../database';
import { Events } from '../events';
import { AzurAPIState } from '../state';
import { createUpdater } from './updater';

export interface ClientToolsProps {
  state: AzurAPIState;
  options: Required<GeneratedClientProps>;
}

/**
 * We return the clientTools depending on the environment used (browser | node)
 * Basically here we do the ugly transformations to be able to have the same inner code inside.
 * @param state Required by updater, state get/set
 * @param options Required by updater, configuration options
 */
export const getClientTools = (props: ClientToolsProps, customImpl?: ClientTools) => {
  if (customImpl) return customImpl;
  const isNode = platformChecker().isNode;
  if (isNode) return getToolsOnNode(props);
  else return getToolsOnBrowser(props);
};

const getToolsOnNode = (props: ClientToolsProps): ClientTools => {
  const nodeUtils = require('./../../node/utils');
  nodeUtils.checkSupportedNodeVersion();
  const EventEmitter = require('events');

  const fs = require('fs');
  const fetch = require('../../node/http').fetch;
  const path = require('path').join(__dirname, '../../');

  const tools: ClientTools = {
    fileManager: {
      write: (path, data) => fs.writeFileSync(path, JSON.stringify(data)),
      read: path => JSON.parse(fs.readFileSync(path, 'utf8')),
      exists: fs.existsSync,
      mkdir: fs.mkdirSync,
    },
    events: new EventEmitter(),
    fetch: async url => JSON.parse(await fetch(url)),
    updater: null,
    localFiles: getLocalDatabase(path),
  };

  tools.updater = createUpdater({ tools, ...props });
  return tools;
};

const getToolsOnBrowser = (props: ClientToolsProps): ClientTools => {
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

  const fetchImpl: Fetch = async (url: string) => await fetch(url).then(res => res.json());

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
  tools.updater = createUpdater({ tools, ...props });
  return tools;
};
