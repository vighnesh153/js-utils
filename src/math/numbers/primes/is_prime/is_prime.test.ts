import { isPrime } from '@utils';

describe('Math > Numbers > Primes > isPrime tests', () => {
  test.each([
    [1.5, false],
    [-2, false],
    [1, false],
    [3, true],
    [42, false],
    [97, true],
    [437, false],
    [899, false],
  ])('isPrime(%i)', (n, expected) => {
    expect(isPrime(n)).toBe(expected);
  });
});
