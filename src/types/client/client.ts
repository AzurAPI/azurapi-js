import { ClientModules, ClientTools } from '.';

export interface ClientOptions {
  autoupdate: boolean;
  rate: number;
}

export interface ClientToolsProps {
  localPath: string;
  useTools: boolean;
  customToolsImpl: ClientTools;
}

export type CreateClientProps = ClientOptions & ClientToolsProps;

export interface Client<Options, Api, State> {
  options: Options;
  api: Api;
  state: State;

  tools?: ClientTools;
  modules?: ClientModules;
}
