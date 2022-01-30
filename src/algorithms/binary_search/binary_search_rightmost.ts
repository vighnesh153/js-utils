/**
 * Search for the rightmost occurrence of an
 * item in the array. If element doesn't exist,
 * returns null.
 *
 * @param array - list in which you want to search
 * @param searchFor - Search element
 * @param key - A key getter. Required, if the elements are
 * complex objects
 *
 * @typeParam T - type of elements in the array
 */
export const binarySearchRightmostOccurrence = <T>(
  array: T[],
  searchFor: T,
  key = (e: T) => e
): number | null => {
  let startIndex = 0;
  let endIndex = array.length - 1;

  let foundIndex: number | null = null;

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const midElement = array[midIndex];

    // Element found
    if (key(midElement) === key(searchFor)) {
      if (foundIndex === null || midIndex > foundIndex) {
        foundIndex = midIndex;
      }
      startIndex = midIndex + 1;
    } else if (key(midElement) < key(searchFor)) {
      startIndex = midIndex + 1;
    } else {
      endIndex = midIndex - 1;
    }
  }

  return foundIndex;
};
