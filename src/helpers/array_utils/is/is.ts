import { not } from '@utils';

/**
 * Comparison result between 2 elements. Returned result's meaning: <br>
 * Negative: element-1 lessThan element-2 <br>
 * Zero: element-1 equals element-2 <br>
 * Positive: element-1 greaterThan element-2 <br>
 */
export type ArrayUtilsCompare = number;

/**
 * A function which compares 2 elements and returns the
 * comparison result between them
 *
 * @typeParam T - type of elements in first array
 * @typeParam Q - type of elements in other array
 */
export type ArrayUtilsCompareFn<T, Q> = (el1: T, el2: Q) => ArrayUtilsCompare;

/**
 * Comparison methods for 2 arrays
 *
 * @typeParam T - type of elements in first array
 */
export interface ArrayComparisonHelpers<T> {
  /**
   * Checked if both arrays are same
   *
   * @param otherArray - array being compared with
   * @param areSame - predicate to see if 2 elements are same
   * @typeParam Q - type of elements in other array
   */
  equalsTo: <Q>(
    otherArray: Q[],
    areSame?: (el1: T, el2: Q) => boolean
  ) => boolean;

  /**
   * Checks if the first array is less than current one
   *
   * @param otherArray - array being compared with
   * @param compare - callback which returns comparison between
   * 2 elements
   * @typeParam Q - type of elements in other array
   */
  lessThan: <Q>(
    otherArray: Q[],
    compare?: ArrayUtilsCompareFn<T, Q>
  ) => boolean;

  /**
   * Checks if the array is less than or equal to other array
   *
   * @param otherArray - array being compared with
   * @param compare - Callback which returns comparison between
   * 2 elements
   * @typeParam Q - type of elements in other array
   */
  lessThanOrEqualsTo: <Q>(
    otherArray: Q[],
    compare?: ArrayUtilsCompareFn<T, Q>
  ) => boolean;

  /**
   * Checks if the array is greater than to other array
   *
   * @param otherArray - array being compared with
   * @param compare - Callback which returns comparison between
   * 2 elements
   * @typeParam Q - type of elements in other array
   */
  greaterThan: <Q>(
    otherArray: Q[],
    compare?: ArrayUtilsCompareFn<T, Q>
  ) => boolean;

  /**
   * Checks if the array is greater than or equal to other array
   *
   * @param otherArray - array being compared with
   * @param compare - Callback which returns comparison between
   * 2 elements
   * @typeParam Q - type of elements in other array
   */
  greaterThanOrEqualsTo: <Q>(
    otherArray: Q[],
    compare?: ArrayUtilsCompareFn<T, Q>
  ) => boolean;
}

const defaultCompareFn = <T, Q>(el1: T, el2: Q): ArrayUtilsCompare => {
  // @ts-ignore
  if ((el1 as unknown) < el2) return -1;
  // @ts-ignore
  if ((el1 as unknown) > el2) return 1;
  return 0;
};

/**
 * Array comparison helpers
 *
 * @param array - Initial array to compare with
 * @typeParam T - type of elements in first array
 */
export const is = <T>(array: T[]): ArrayComparisonHelpers<T> => {
  const equalsTo = <Q>(
    otherArray: Q[],
    areSame = (el1: T, el2: Q) => (el1 as unknown) === (el2 as unknown)
  ): boolean => {
    const arrayLength = array.length;
    const otherArrayLength = otherArray.length;

    // If lengths are not same, then the arrays are
    // definitely not same
    if (arrayLength !== otherArrayLength) return false;

    for (let i = 0; i < arrayLength; i += 1) {
      const el1 = array[i];
      const el2 = otherArray[i];

      // At least 1 element is not same, so return false.
      if (not(areSame(el1, el2))) {
        return false;
      }
    }

    return true;
  };

  const lessThan = <Q>(
    otherArray: Q[],
    compare: ArrayUtilsCompareFn<T, Q> = defaultCompareFn
  ): boolean => {
    let i = 0;
    let j = 0;

    const arrayLength = array.length;
    const otherArrayLength = otherArray.length;

    while (i < arrayLength && j < otherArrayLength) {
      const el1 = array[i];
      const el2 = otherArray[j];

      const compareResult = compare(el1, el2);

      if (compareResult < 0) return true;
      if (compareResult > 0) return false;

      // Both el1 and el2 are same. Check at next pair of indices
      i += 1;
      j += 1;
    }

    // If we exit out of loop, then at least 1 index went out
    // of bounds. If "i" goes out of bounds, "j" is in bounds,
    // then, array1 is less than array 2
    return i === arrayLength && j < otherArrayLength;
  };

  const lessThanOrEqualsTo = <Q>(
    otherArray: Q[],
    compare: ArrayUtilsCompareFn<T, Q> = defaultCompareFn
  ): boolean => {
    if (lessThan(otherArray, compare)) {
      return true;
    }
    return equalsTo(otherArray, (el1, el2) => compare(el1, el2) === 0);
  };

  const greaterThan = <Q>(
    otherArray: Q[],
    compare: ArrayUtilsCompareFn<T, Q> = defaultCompareFn
  ): boolean => {
    return not(lessThanOrEqualsTo(otherArray, compare));
  };

  const greaterThanOrEqualsTo = <Q>(
    otherArray: Q[],
    compare: ArrayUtilsCompareFn<T, Q> = defaultCompareFn
  ): boolean => {
    return not(lessThan(otherArray, compare));
  };

  return {
    equalsTo,
    lessThan,
    lessThanOrEqualsTo,
    greaterThan,
    greaterThanOrEqualsTo,
  };
};
