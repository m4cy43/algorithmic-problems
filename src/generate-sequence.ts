export function generateSequence(n: number, missing: number[]): number[] {
  const result: number[] = [];
  const missingSet = new Set(missing);

  for (let i = 1; i <= n; i++) {
    if (!missingSet.has(i)) {
      result.push(i);
    }
  }

  return result;
}
