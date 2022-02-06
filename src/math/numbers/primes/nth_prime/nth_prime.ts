import { Validators } from 'src/_internal_validators';
import { isPrime } from '@utils';

/**
 * Find the nth prime
 *
 * @param n - nth prime
 * @throws Will throw if n is not a positive integer
 */
export const nthPrime = (n: number): number => {
  Validators.validatePositiveInteger(n, 'n');

  let count = 0;
  let nthPrimeValue = -1;

  for (let possiblePrime = 2; ; possiblePrime += 1) {
    if (isPrime(possiblePrime)) {
      count += 1;
      if (count === n) {
        nthPrimeValue = possiblePrime;
        break;
      }
    }
  }

  return nthPrimeValue;
};
