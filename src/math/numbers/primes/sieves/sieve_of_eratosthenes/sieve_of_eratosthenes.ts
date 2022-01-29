import { times } from 'src/helpers/times';

/**
 * Generates all the primes before "limit" (inclusive)
 *
 * @param limit - upper limit for generating primes
 */
export const sieveOfEratosthenes = (limit: number): number[] => {
  if (limit < 0) return [];

  const isIndexPrime = times(limit + 1).do(() => true);
  isIndexPrime[0] = false;
  isIndexPrime[1] = false;

  // Algorithm: https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes#Algorithm_and_variants
  for (let index = 0; index <= limit; index += 1) {
    if (isIndexPrime[index]) {
      for (
        let multipleOfIndex = index * 2;
        multipleOfIndex <= limit;
        multipleOfIndex += index
      ) {
        isIndexPrime[multipleOfIndex] = false;
      }
    }
  }

  return isIndexPrime
    .map((isPrime, index) => ({ isPrime, number: index }))
    .filter(({ isPrime }) => isPrime)
    .map(({ number }) => number);
};
