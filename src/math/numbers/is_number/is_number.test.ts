import { isNumber } from '@utils';

describe('Math > Numbers > isNumber tests', () => {
  it('should return false if string is provided', () => {
    expect(isNumber('abc')).toBe(false);
  });

  it('should return false if boolean is provided', () => {
    expect(isNumber(true)).toBe(false);
  });

  it('should return true if number is provided', () => {
    expect(isNumber(1.234)).toBe(true);
  });
});
