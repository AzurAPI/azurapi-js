import { FetchTemplate, RequestOptionsTemplate } from '../../types/client';

interface APIOptions {
  fetch: FetchTemplate;
  basePath?: string;
  sharedOptions: RequestOptionsTemplate;
}

export type FetchAPI = ReturnType<typeof useFetchAPI>;
export const useFetchAPI = (props: APIOptions) => {
  const { fetch, sharedOptions, basePath = '/' } = props;

  const normalizePath = (path: string) => '/' + `${basePath}${path}`.replace(/^[\\/]+|[\\/]+$/g, '');

  const get = <T>(options: Partial<RequestOptionsTemplate>) => {
    const mergedOptions: RequestOptionsTemplate = {
      ...sharedOptions,
      method: 'GET',
      path: normalizePath(options.path),
      ...options,
    };
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
    return fetch<T>(mergedOptions);
  };

  return { get, post };
};
