import { nextPrime } from '@utils';

describe('Math > Numbers > Primes > nextPrime tests', () => {
  test.each([
    [2, 3],
    [3, 5],
    [7.5, 11],
    [15, 17],
  ])(`nextPrime(%j) equals %j`, (current, expected) => {
    expect(nextPrime(current)).toBe(expected);
  });
});
