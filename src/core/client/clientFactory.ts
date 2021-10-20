import { ClientTools } from '../../types/client';

export interface ClientOptions {
  autoupdate: boolean;
  rate: number;
}

export interface ClientToolsProps {
  localPath: string;
  useTools: boolean;
  customToolsImpl: ClientTools;
}

export interface ClientFactoryProps<Options, Api> {
  defaultOptions: Options;
  api: Api;

  beforeCreate?: () => void;
  onCreate?: (client: AzurAPIClient<Options, Api>) => void;
}

export type GeneratedClientProps = Partial<ClientOptions & ClientToolsProps>;

export interface AzurAPIClient<Options, Api> {
  options: Options;
  api: Api;
}

export const createClientFactory = <Options extends ClientOptions, Api>(props: ClientFactoryProps<Options, Api>) => {
  const { onCreate = () => undefined, beforeCreate = () => undefined } = props;

  const clientTemplate = (localProps: GeneratedClientProps): AzurAPIClient<Options, Api> => {
    let options: Options = { ...props.defaultOptions, ...localProps };

    beforeCreate();

    const client: AzurAPIClient<Options, Api> = {
      options,
      api: props.api,
    };

    onCreate(client);
    return client;
  };

  return clientTemplate;
};
