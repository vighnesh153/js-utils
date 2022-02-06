import { Validators } from 'src/_internal_validators';
import { primeFactorize, PrimeFactors } from '@utils';

const mergePrimeFactors = (
  primeFactors1: PrimeFactors,
  primeFactors2: PrimeFactors
): PrimeFactors => {
  const mergedPrimeFactors: PrimeFactors = {};
  const combinedPrimes = Array.from(
    new Set([...Object.keys(primeFactors1), ...Object.keys(primeFactors2)])
  );
  combinedPrimes.forEach((primeStr) => {
    const prime = parseInt(primeStr, 10);
    mergedPrimeFactors[prime] = Math.max(
      primeFactors1[prime] || 0,
      primeFactors2[prime] || 0
    );
  });
  return mergedPrimeFactors;
};

export const lcm = (...numbers: number[]) => {
  // Validate each number
  numbers.forEach((n, index) => {
    Validators.validatePositiveInteger(n, `numbers[${index}]`);
  });

  // Container to hold the prime factors of the lcm
  let lcmPrimeFactors: PrimeFactors = {};

  // For each number, merge its prime factors with lcm
  numbers.forEach((n) => {
    lcmPrimeFactors = mergePrimeFactors(lcmPrimeFactors, primeFactorize(n));
  });

  // Reduce the prime factors of lcm to the actual value
  return Object.keys(lcmPrimeFactors).reduce((prev, current) => {
    const currentPrime = parseInt(current, 10);
    return prev * currentPrime ** lcmPrimeFactors[currentPrime];
  }, 1);
};
