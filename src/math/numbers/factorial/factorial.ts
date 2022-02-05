import { memoize } from 'src/helpers';
import { isInteger, not } from '@utils';

/**
 * Returns the factorial of a number
 *
 * @param n - find factorial of this number
 * @throws Will throw if "n" is not a non-negative integer
 */
export const factorial = memoize((n: number): number => {
  if (not(isInteger(n)) || n < 0) {
    throw new Error(`Expected "n" to be a non-negative integer, found "${n}"`);
  }
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}) as (n: number) => number; // This typecast is needed for typedoc
