import https from 'https';

/**
 * Fetch data
 * @param url URL
 * @param parser Transformation to date after its received
 */
export function fetch(url: string): Promise<string> {
  return new Promise((resolve, reject) =>
    https
      .get(url, resp => {
        //console.debug('fetch', url);
        let data = '';
        resp.on('data', chunk => (data += chunk));
        resp.on('end', () => resolve(data));
      })
      .on('error', err => reject(err))
  );
}
