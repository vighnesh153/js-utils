/**
 * Search for an item in the array. If element doesn't exist,
 * returns null.
 *
 * @param array - list in which you want to search
 * @param searchFor - Search element
 * @param key - A key getter. Required, if the elements are
 * complex objects
 *
 * @typeParam T - type of elements in the array
 */
export function binarySearch<T>(array: T[], searchFor: T, key = (e: T) => e): number | null {
  let startIndex = 0;
  let endIndex = array.length - 1;

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const midElement = array[midIndex];

    // Element found
    if (key(midElement) === key(searchFor)) {
      return midIndex;
    }

    if (key(midElement) < key(searchFor)) {
      startIndex = midIndex + 1;
    } else {
      endIndex = midIndex - 1;
    }
  }

  return null;
}
