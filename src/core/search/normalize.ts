/**
 * Normalize a string
 * @param string A string
 */
export const normalize = (string: string) => {
  const combining = /[\u0300-\u036F]/g;
  return string.normalize('NFKD').replace(combining, '');
};
