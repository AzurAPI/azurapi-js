// Testing
/**
 * Find difference between string using dice coefficient
 * @param a first string
 * @param b second string
 * @returns number
 */
export function diceCoefficient(a: string, b: string): number {
  if (a.length < 0 || b.length < 0) return 0;
  const bigramL: string[] = bigramGen(a);
  const bigramR: string[] = bigramGen(b);
  let intersection: number = 0;
  for (let i: number = 0; i < a.length - 1; i++) {
    if (bigramL[i] === bigramR[i]) intersection++;
  }
  return (2.0 * intersection) / (a.length + b.length - 2);
}

/**
 * Find difference between string using levenshtein distance (recursive edition)
 * @param a first string
 * @param b second string
 * @param i first index (internal use)
 * @param j second index (internal use)
 * @returns number
 */
export function levenDistRec(a: string, b: string, i?: number, j?: number): number {
  if (i === undefined || j === undefined) return levenDistRec(a, b, a.length - 1, b.length - 1);
  if (i === 0 && j === 0) return 0;
  if (i === 0) return j;
  if (j === 0) return i;
  var sub = levenDistRec(a, b, i - 1, j - 1) + (a[i] === b[j] ? 0 : 1);
  var del = levenDistRec(a, b, i, j - 1) + 1;
  var add = levenDistRec(a, b, i - 1, j) + 1;
  return Math.min(sub, add, del);
}
/**
 * Find difference between string using levenshtein distance (accurate edition)
 * @param a first string
 * @param b second string
 */
export function distance2(a: string, b: string): number {
  const len1 = a.length;
  const len2 = b.length;
  const DP = new Array(2);
  for (let i = 0; i < 2; i++) {
    DP[i] = new Array(len1 + 1);
    for (let j = 0; j < len1 + 1; j++) DP[i][j] = 0;
  }
  for (let i = 0; i <= len1; i++) DP[0][i] = i;
  for (let i = 1; i <= len2; i++) {
    for (let j = 0; j <= len1; j++) {
      if (j === 0) {
        DP[i % 2][j] = i;
      } else if (a[j - 1] === b[i - 1]) {
        DP[i % 2][j] = DP[(i - 1) % 2][j - 1];
      } else {
        DP[i % 2][j] = 1 + Math.min(DP[(i - 1) % 2][j], Math.min(DP[i % 2][j - 1], DP[(i - 1) % 2][j - 1]));
      }
    }
  }
  return DP[len2 % 2][len1];
}
/**
 * Find difference between string using levenshtein distance (fast edition)
 * @param a first string
 * @param b second string
 * @returns number
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a.length < 0) return a.length;
  if (b.length < 0) return b.length;
  const row = Array(a.length + 1);
  for (let i: number = 0; i <= a.length; i++) {
    row[i] = i;
  }
  let prev: number, val: number;
  for (let t = 1; t <= b.length; t++) {
    prev = t;
    for (let j = 1; j <= a.length; j++) {
      if (a[t - 1] === b[j - 1]) {
        val = row[j - 1];
      } else {
        val = Math.min(row[j - 1] + 1, Math.min(prev + 1, row[j] + 1));
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }
  return row[a.length];
}

/**
 * Generate bigram
 * @param s string to generate bigram from
 * @returns array
 */
function bigramGen(s: string): string[] {
  /*  const a: string[] = s.split(/\s/g);
  const g: string[] = [];
  for (let i: number = 0; i < s.length - 1; i++) {
    const w: string = a[i];
    const x: string = a[i + 1];
    g.push(`${w} ${x}`);
  }
  return g; */
  const a: string = s.replace(/\s/g, '');
  const g: string[] = [];
  for (let i: number = 0; i < s.length - 1; i++) {
    g.push(a.substr(i, 2));
  }
  return g;
}
