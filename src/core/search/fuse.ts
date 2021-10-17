import Fuse from 'fuse.js';

export const fuse = <T>(name: string, list: T[], keys: string[] = []): Fuse.FuseResult<T>[] => {
  const instance = new Fuse<T>(list, { keys, threshold: 0.4 });
  return instance.search(name, { limit: 10 }).sort((a, b) => (b.score || 0) - (a.score || 0));
};
