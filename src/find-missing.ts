/**
 * Finds missing numbers in a sorted sequence from 1 to N.
 * @param arr Sorted array containing numbers from the range [1..N] with some values missing.
 * @param n Upper bound of the sequence (inclusive).
 * @param limit Maximum number of missing values to return.
 * - `undefined`: return all missing values
 * - `> 0`: return at most `limit` missing values
 */
export function findMissing(arr: number[], n: number, limit?: number): number[] {
  // Input validation
  if (arr.length === 0) {
    throw new Error('Input array must not be empty');
  }
  if (n < 1) {
    throw new Error('n must be >= 1');
  }
  if (arr[arr.length - 1]! > n) {
    throw new Error(`Array contains value ${arr[arr.length - 1]} greater than n=${n}`);
  }

  const missing: number[] = [];
  const hasLimit = limit !== undefined && limit > 0;
  const shouldStop = () => hasLimit && missing.length >= limit!;

  // Check for missing numbers before the first element
  const first = arr[0]!;
  for (let v = 1; v < first; v++) {
    missing.push(v);
    if (shouldStop()) return missing;
  }

  // Scan gaps between adjacent elements
  for (let i = 1; i < arr.length; i++) {
    const prev = arr[i - 1]!;
    const current = arr[i]!;
    const gapEnd = hasLimit ? Math.min(current, prev + 1 + (limit! - missing.length)) : current;

    for (let v = prev + 1; v < gapEnd; v++) {
      missing.push(v);
    }

    if (shouldStop()) return missing;
  }

  // Check for missing numbers after the last element
  const last = arr[arr.length - 1]!;
  for (let v = last + 1; v <= n; v++) {
    missing.push(v);
    if (shouldStop()) return missing;
  }

  return missing;
}
