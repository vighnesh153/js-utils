import { isInteger, isPrime } from '@utils';

/**
 * Find the prime number occurring before "n"
 * @param n - Find prime number before "n"
 */
export const previousPrime = (n: number): number | null => {
  let current = isInteger(n) ? n - 1 : parseInt(`${n}`, 10);
  while (current > 1) {
    if (isPrime(current)) return current;
    current -= 1;
  }
  return null;
};
