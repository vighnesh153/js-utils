import { isInteger } from './is_integer';

describe('Math > Numbers > isInteger tests', () => {
  test.each([
    ['abc', false],
    [true, false],
    [1.2, false],
    [42, true],
  ])('', (value, expected) => {
    expect(isInteger(value)).toBe(expected);
  });
});
