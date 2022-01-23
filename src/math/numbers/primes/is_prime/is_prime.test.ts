/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import isPrime from './is_prime';

describe('Math > Numbers > Primes > isPrime tests', () => {
  it('should return false for floating numbers', () => {
    expect(isPrime(1.5)).toBe(false);
  });

  it('should return false for negative numbers', () => {
    expect(isPrime(-2)).toBe(false);
  });

  it('should return false for 1', () => {
    expect(isPrime(1)).toBe(false);
  });

  it('should return true for a prime', () => {
    expect(isPrime(3)).toBe(true);
  });

  it('should return false for a composite number', () => {
    expect(isPrime(42)).toBe(false);
  });
});
