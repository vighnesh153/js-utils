import { gcd } from '@utils';

describe('Math > Numbers > gcd tests', () => {
  it('should throw error if negative number is passed', () => {
    expect(() => gcd(-1)).toThrowErrorMatchingInlineSnapshot(
      `"Expected \\"numbers[0]\\" to be a non-negative integer, found \\"-1\\""`
    );
  });

  it('should throw error if decimal number is passed', () => {
    expect(() => gcd(0.5)).toThrowErrorMatchingInlineSnapshot(
      `"Expected \\"numbers[0]\\" to be a non-negative integer, found \\"0.5\\""`
    );
  });

  test.each([
    [[], 1],
    [[1], 1],
    [[2, 4], 2],
    [[4, 4, 4], 4],
    [[7, 8, 3], 1],
    [[9, 30, 21], 3],
  ])('gcd(...%j) equals %j', (values, expectedGcd) => {
    expect(gcd(...values)).toBe(expectedGcd);
  });
});
