export const isNodeEnvironment = () => {
  try {
    return typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null;
  } catch (error) {
    return false;
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
