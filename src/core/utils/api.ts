import { FetchTemplate, RequestOptionsTemplate } from '@atsu/multi-env-impl';
import { Events } from '../events';

interface APIOptions {
  fetch: FetchTemplate;
  basePath?: string;
  sharedOptions: RequestOptionsTemplate;
  logger?: (event: Events, data: any) => void;
}

export type FetchAPI = ReturnType<typeof useFetchAPI>;
export const useFetchAPI = (props: APIOptions) => {
  const { fetch, sharedOptions, basePath = '/', logger } = props;

  const normalizePath = (path: string) => '/' + `${basePath}${path}`.replace(/^[\\/]+|[\\/]+$/g, '');

  const get = <T>(options: Partial<RequestOptionsTemplate>) => {
    const mergedOptions: RequestOptionsTemplate = {
      ...sharedOptions,
      method: 'GET',
      path: normalizePath(options.path),
      ...options,
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
