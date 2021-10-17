import { EventsTemplate, UpdaterTemplate } from '../../types/client';
import { fnTemplate } from '../utils/defaults';

export interface ClientOptions {
  autoupdate: boolean;
  rate: number;
}

export interface ClientLifecycleProps {
  updater: UpdaterTemplate;
  events: EventsTemplate;
}

export interface ClientFactoryProps<Options, Api> {
  defaultOptions: Options;
  api: Api;

  beforeCreate?: () => void;
  onCreate?: (client: AzurAPIClient<Options, Api>) => void;
}

export type GeneratedClientProps = Partial<ClientOptions> & Partial<ClientLifecycleProps>;

export interface AzurAPIClient<Options, Api> extends Partial<ClientLifecycleProps> {
  options: Options;
  api: Api;
}

export const createClientFactory = <Options extends ClientOptions, Api>(props: ClientFactoryProps<Options, Api>) => {
  const { onCreate = fnTemplate, beforeCreate = fnTemplate } = props;

  const clientTemplate = (localProps: GeneratedClientProps): AzurAPIClient<Options, Api> => {
    let options: Options = { ...props.defaultOptions, ...localProps };

    beforeCreate();

    const client: AzurAPIClient<Options, Api> = {
      options,
      api: props.api,
    };

    if (localProps.events) client.events = localProps.events;
    if (localProps.updater) client.updater = localProps.updater;

    onCreate(client);
    return client;
  };

  return clientTemplate;
};
