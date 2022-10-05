import { Validators } from 'src/_internal_validators';

/**
 * Returns the factorial of a number
 *
 * @param n - find factorial of this number
 * @throws Will throw if "n" is not a non-negative integer
 */
export function factorial(n: number): number {
  Validators.validateNonNegativeInteger(n, 'n');
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
