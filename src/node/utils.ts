export const checkSupportedNodeVersion = (): void => {
  if (parseFloat(process.version.replace('v', '')) <= 14)
    throw new Error(`AzurAPI requires Node v14 or above, 
        if you would like to use an older Node version, 
        please use any version of this package below v0.2.13 (Not Recommended)`);
};
