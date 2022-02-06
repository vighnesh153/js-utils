import { nthPrime } from '@utils';

describe('Math > Numbers > Primes > nthPrime tests', () => {
  it('should throw error if n is not positive integer', () => {
    expect(() => nthPrime(-2)).toThrowErrorMatchingInlineSnapshot(
      `"Expected \\"n\\" to be a positive integer, found \\"-2\\""`
    );
    expect(() => nthPrime(5.5)).toThrowErrorMatchingInlineSnapshot(
      `"Expected \\"n\\" to be a positive integer, found \\"5.5\\""`
    );
  });

  test.each([
    [1, 2],
    [4, 7],
    [10, 29],
  ])('nthPrime(%j) equals %j', (n, expected) => {
    expect(nthPrime(n)).toBe(expected);
  });
});
