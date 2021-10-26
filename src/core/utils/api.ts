import { FetchTemplate, RequestOptionsTemplate } from '@atsu/multi-env-impl';
import { Events } from '../events';

export interface FetchAPIProps {
  fetch: FetchTemplate;
  basePath?: string;
  sharedOptions: RequestOptionsTemplate;
  logger?: (event: Events, data: any) => void;
}

export type FetchAPI = ReturnType<typeof useFetchAPI>;
export const useFetchAPI = (props: FetchAPIProps) => {
  const { fetch, sharedOptions, basePath = '/', logger } = props;

  const match = /^[\\/]+|[\\/]+$/gm; // Matches all trailing and preceding slashes
  const normalizePath = (path: string) => '/' + `${basePath}${path}`.replace(match, '');

  const get = <T>(options: Partial<RequestOptionsTemplate>) => {
    const mergedOptions: RequestOptionsTemplate = {
      ...sharedOptions,
      ...options,
      method: 'GET',
      path: normalizePath(options.path),
    };
    logger && logger(Events.debug, mergedOptions);
    return fetch<T>(mergedOptions);
  };

  const post = <T>(options: Partial<RequestOptionsTemplate>) => {
    const mergedOptions: RequestOptionsTemplate = {
      ...sharedOptions,
      method: 'POST',
      path: normalizePath(options.path),
      headers: { 'Content-type': 'application/json' },
      ...options,
    };
    logger && logger(Events.debug, mergedOptions);
    return fetch<T>(mergedOptions);
  };

  return { get, post };
};
