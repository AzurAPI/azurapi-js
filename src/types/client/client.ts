import { ClientTools } from '.';

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

export interface Client<Options, Api> {
  options: Options;
  api: Api;
}
