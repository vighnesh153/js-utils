import { factorial } from '@utils';

describe('Math > Numbers > factorial tests', () => {
  it('should throw if input number is not an integer', () => {
    expect(() => factorial(2213.3)).toThrowErrorMatchingInlineSnapshot(
      `"Expected "n" to be a non-negative integer, found "2213.3""`
    );
  });

  it('should throw if input number is not positive', () => {
    expect(() => factorial(-4)).toThrowErrorMatchingInlineSnapshot(
      `"Expected "n" to be a non-negative integer, found "-4""`
    );
  });

  test.each([
    [1, 1],
    [3, 6],
    [5, 120],
    [10, 3628800],
  ])('factorial(%j) equals %j', (n, result) => {
    expect(factorial(n)).toBe(result);
  });
});
