import https, { RequestOptions } from 'https';

/**
 * Fetch data
 * @param url URL
 * @param options RequestOptions
 */
export const fetch = (options?: RequestOptions): Promise<string> => {
  return new Promise((resolve, reject) => {
    const onResponse = resp => {
      let data = '';
      resp.on('data', chunk => (data += chunk));
      resp.on('end', () => resolve(data));
    };

    const req = https.request(options, onResponse);

    req.on('error', error => {
      console.error(error);
    });
  });
};
