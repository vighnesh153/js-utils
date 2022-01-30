import { binarySearchRightmostOccurrence } from './binary_search_rightmost';

describe('Algorithms > Binary Search Rightmost occurrence tests', () => {
  test.each([
    [[1, 2, 4, 5, 10], 5, 3],
    [[1, 2, 2, 2, 2], 2, 4],
    [[1, 2, 2, 2, 2], 1, 0],
    [[1, 2, 2, 2, 2], 99, null],
  ])(
    'In array: %j, search: %j. Expected index: %j',
    (arr, searchValue, expectedSearchIndex) => {
      const searchIndex = binarySearchRightmostOccurrence(arr, searchValue);
      expect(searchIndex).toBe(expectedSearchIndex);
    }
  );
});
