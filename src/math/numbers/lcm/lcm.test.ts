import { lcm } from '@utils';

describe('Math > Numbers > lcm tests', () => {
  it('should throw error if negative number is passed', () => {
    expect(() => lcm(-1)).toThrowErrorMatchingInlineSnapshot(
      `"Expected "numbers[0]" to be a positive integer, found "-1""`
    );
  });

  it('should throw error if decimal number is passed', () => {
    expect(() => lcm(0.5)).toThrowErrorMatchingInlineSnapshot(
      `"Expected "numbers[0]" to be a positive integer, found "0.5""`
    );
  });

  it.each([
    [[], 1],
    [[1], 1],
    [[2, 4], 4],
    [[4, 4, 4], 4],
    [[7, 2, 3, 4], 84],
  ])('gcd(...%j) equals %j', (values, expectedLcm) => {
    expect(lcm(...values)).toBe(expectedLcm);
  });
});
