/* global window self */
export const platformChecker = () => {
  try {
    const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

    const isWebWorker =
      typeof self === 'object' && self.constructor && self.constructor.name === 'DedicatedWorkerGlobalScope';

    const isNode = typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null;

    const isJsDom = () =>
      (typeof window !== 'undefined' && window.name === 'nodejs') ||
      navigator.userAgent.includes('Node.js') ||
      navigator.userAgent.includes('jsdom');

    return { isBrowser, isWebWorker, isNode, isJsDom };
  } catch (error) {
    console.debug('Platform Checker:', error);
  }
};

export const checkSupportedNodeVersion = (): void => {
  if (!process) throw new Error(`Node is not installed`);

  if (parseFloat(process.version.replace('v', '')) <= 14) {
    throw new Error(`AzurAPI requires Node v14 or above, 
        if you would like to use an older Node version, 
        please use any version of this package below v0.2.13 (Not Recommended)`);
  }
};
