import { memoize } from 'src/helpers';
import { Validators } from 'src/_internal_validators';

/**
 * Returns the factorial of a number
 *
 * @param n - find factorial of this number
 * @throws Will throw if "n" is not a non-negative integer
 */
export const factorial = memoize((n: number): number => {
  Validators.validateNonNegativeInteger(n, 'n');
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}) as (n: number) => number; // This typecast is needed for typedoc
