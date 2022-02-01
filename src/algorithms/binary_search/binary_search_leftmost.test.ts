import { binarySearchLeftmostOccurrence } from '@utils';

describe('Algorithms > Binary Search Leftmost occurrence tests', () => {
  test.each([
    [[1, 2, 4, 5, 10], 5, 3],
    [[1, 2, 2, 2, 2], 2, 1],
    [[1, 2, 2, 2, 2], 1, 0],
    [[1, 2, 2, 2, 2], 99, null],
  ])(
    'In array: %j, search: %j. Expected index: %j',
    (arr, searchValue, expectedSearchIndex) => {
      const searchIndex = binarySearchLeftmostOccurrence(arr, searchValue);
      expect(searchIndex).toBe(expectedSearchIndex);
    }
  );
});
