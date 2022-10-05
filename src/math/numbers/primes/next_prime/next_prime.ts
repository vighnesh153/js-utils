import { isInteger, isPrime } from '@utils';

/**
 * Find the prime number occurring after "n"
 *
 * @param n - Find prime number after "n"
 */
export function nextPrime(n: number): number {
  let current = isInteger(n) ? n + 1 : parseInt(`${n + 1}`, 10);
  let nextPrimeValue = -1;
  while (current > 1) {
    if (isPrime(current)) {
      nextPrimeValue = current;
      break;
    }
    current += 1;
  }
  return nextPrimeValue;
}
