/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import isInteger from './is_integer';

describe('Math > Numbers > isInteger tests', () => {
  it('should return false if the provided value is a string', () => {
    expect(isInteger('abc')).toBe(false);
  });

  it('should return false if the provided value is a boolean', () => {
    expect(isInteger(true)).toBe(false);
  });

  it('should return false if the provided value is a float', () => {
    expect(isInteger(1.2)).toBe(false);
  });

  it('should return true if the provided value is an integer', () => {
    expect(isInteger(42)).toBe(true);
  });
});
