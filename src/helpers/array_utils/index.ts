import {
  ArrayComparisonHelpers,
  ArrayUtilsCompare,
  ArrayUtilsCompareFn,
  is,
} from './is';

export type { ArrayUtilsCompareFn, ArrayComparisonHelpers, ArrayUtilsCompare };

/**
 * A bunch of array utility functions
 */
export class ArrayUtils {
  /**
   * Array comparison utilities
   *
   * @typeParam T - type of elements in first array
   */
  static is: <T>(array: T[]) => ArrayComparisonHelpers<T> = is;
}
