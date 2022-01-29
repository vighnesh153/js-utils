/**
 * Prime factors of a number as key-value pairs.
 *
 * key: prime,
 * value: count of occurrences
 */
export interface PrimeFactors {
  [prime: number]: number;
}

/**
 * Factors the provided number into prime factors
 *
 * @param num - number to prime factorize
 */
export const primeFactorize = (num: number): PrimeFactors => {
  let n = num;
  const primeFactors: PrimeFactors = {};

  let i = 2;
  while (i <= n) {
    if (n % i === 0) {
      primeFactors[i] = (primeFactors[i] || 0) + 1;
      n /= i;
    } else {
      i += 1;
    }
  }

  return primeFactors;
};
