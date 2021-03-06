import { previousPrime } from '@utils';

describe('Math > Numbers > Primes > previousPrime tests', () => {
  test.each([
    [2, null],
    [3, 2],
    [7.5, 7],
    [15, 13],
  ])(`previousPrime(%j) equals %j`, (current, expected) => {
    expect(previousPrime(current)).toBe(expected);
  });
});
