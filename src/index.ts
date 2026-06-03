import { findMissing } from './find-missing';
import { generateSequence } from './generate-sequence';

type TestCase = {
  label: string;
  n: number;
  missing: number[];
  limit?: number;
};

const cases: TestCase[] = [
  { label: 'N=10, start', n: 10, missing: [1, 2] },
  { label: 'N=10, end', n: 10, missing: [9, 10] },
  { label: 'N=10, first and last', n: 10, missing: [1, 10] },
  { label: 'N=10, middle', n: 10, missing: [4, 6] },
  { label: 'N=10, middle (near)', n: 10, missing: [5, 6] },

  { label: 'N=3, first two', n: 3, missing: [1, 2] },
  { label: 'N=3, last two', n: 3, missing: [2, 3] },
  { label: 'N=3, edges', n: 3, missing: [1, 3] },

  { label: 'N=10^6, start', n: 1000000, missing: [1, 2] },
  { label: 'N=10^6, end', n: 1000000, missing: [999999, 1000000] },
  { label: 'N=10^6, middle', n: 1000000, missing: [123456, 789012] },
  { label: 'N=10^6, middle (near)', n: 1000000, missing: [500000, 500001] },

  // Extra case with limit > 2
  { label: '*N=10, three missing', n: 10, missing: [3, 6, 7] },
  // Expected to be failed: expected [3, 6, 7], found [3, 6]
  { label: '*N=10, failed, three with limit = 2', n: 10, missing: [3, 6, 7], limit: 2 },
];

let passed = 0;
let failed = 0;

for (const { label, n, missing, limit } of cases) {
  const arr = generateSequence(n, missing);

  const expected = [...missing].sort((a, b) => a - b);

  const t0 = performance.now();
  const found = findMissing(arr, n, limit).sort((a, b) => a - b);
  const timeMs = (performance.now() - t0).toFixed(2);

  const success =
    found.length === expected.length && found.every((value, index) => value === expected[index]);

  if (success) {
    passed++;
  } else {
    failed++;
  }

  const status = success ? '✓' : '✗';
  const nStr = n.toLocaleString().padStart(9);

  console.log(
    `  ${status}  ${label.padEnd(40)}  N = ${nStr}  expected: [${expected.join(', ')}]  found: [${found.join(', ')}]  ${timeMs} ms`,
  );
}

console.log(`\n  Result: ${passed} passed, ${failed} failed\n`);
