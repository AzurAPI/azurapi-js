/**
 * Normalize a string
 * @param string A string
 */
export const normalize = (string: string) => {
  // ? Why this is needed?
  const combining = /[\u0300-\u036F]/g;

  return string.normalize('NFKD').replace(combining, '');
};
