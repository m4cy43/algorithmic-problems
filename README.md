# Find Missing Numbers

Given a sorted sequence containing numbers from `1` to `N` with missing values, find the missing numbers.

Default case - two missing numbers.

## Complexity

- Time Complexity: `O(N + K)`
- Space Complexity: `O(K)`

Where `K` is the number of missing values returned.

For the default case (`limit = 2`):

- Time Complexity: `O(N)`
- Space Complexity: `O(1)`

## Run

```bash
npm install
npm run dev
```

## Project Structure

```text
src
├── find-missing.ts      # Missing numbers search algorithm
├── generate-sequence.ts # Test data generator
└── index.ts             # Test runner
```
