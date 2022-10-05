import { primeFactorize, PrimeFactors } from '@utils';
import { Validators } from 'src/_internal_validators';

// Find the intersection between 2 PrimeFactors objects
const primeFactorsIntersection = (primeFactors1: PrimeFactors | null, primeFactors2: PrimeFactors): PrimeFactors => {
  if (primeFactors1 === null) return primeFactors2;

  const intersection: PrimeFactors = {};

  Object.keys(primeFactors1).forEach((key) => {
    const prime = key as unknown as keyof PrimeFactors;
    const factors1 = primeFactors1[prime] || 0;
    const factors2 = primeFactors2[prime] || 0;
    intersection[prime] = Math.min(factors1, factors2);
  });

  return intersection;
};

/**
 * Calculate the greatest common divisor of numbers
 *
 * @param numbers - List of numbers to find the gcd of
 * @throws - Will throw if numbers passed are not integers or negative
 */
export function gcd(...numbers: number[]): number {
  // Validate each number
  numbers.forEach((n, index) => {
    Validators.validateNonNegativeInteger(n, `numbers[${index}]`);
  });

  // Container to hold the prime factors of the gcd
  let gcdPrimeFactors: PrimeFactors | null = null;

  // For each number, find the common prime factors with gcd
  numbers.forEach((n) => {
    gcdPrimeFactors = primeFactorsIntersection(gcdPrimeFactors, primeFactorize(n));
  });

  if (gcdPrimeFactors === null) {
    return 1;
  }

  // Reduce the prime factors of gcd to the actual value
  return Object.keys(gcdPrimeFactors).reduce((prev, current) => {
    const currentPrime = parseInt(current, 10);
    return prev * currentPrime ** gcdPrimeFactors![currentPrime];
  }, 1);
}
