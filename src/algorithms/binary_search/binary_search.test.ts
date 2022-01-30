import { binarySearch } from './binary_search';

describe('Algorithms > Binary Search tests', () => {
  test.each([
    [[1, 2, 4, 5, 10], 5, 3],
    [[1, 2, 4, 5, 10], 10, 4],
    [[1, 2, 4, 5, 10], 1, 0],
    [[1, 2, 4, 5, 10], 42, null],
  ])(
    'In array: %j, search: %j. Expected index: %j',
    (arr, searchValue, expectedSearchIndex) => {
      const searchIndex = binarySearch(arr, searchValue);
      expect(searchIndex).toBe(expectedSearchIndex);
    }
  );
});
