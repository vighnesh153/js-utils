import { randomInteger } from '@utils';

describe('Math > Random > randomInteger tests', () => {
  it('should throw if start is not an integer', () => {
    expect(() => randomInteger(0.4, 3, 1)).toThrowErrorMatchingInlineSnapshot(
      `"Expected "start" to be integer, found "0.4""`
    );
  });

  it('should throw if end is not an integer', () => {
    expect(() => randomInteger(0, 3.5, 1)).toThrowErrorMatchingInlineSnapshot(
      `"Expected "end" to be integer, found "3.5""`
    );
  });

  it('should throw if step is 0', () => {
    expect(() => randomInteger(1, 3, 0)).toThrowErrorMatchingInlineSnapshot(
      `"Expected "step" to be a non-zero integer, found "0""`
    );
  });

  it('should throw if step is not an integer', () => {
    expect(() => randomInteger(0, 10, 5.1)).toThrowErrorMatchingInlineSnapshot(
      `"Expected "step" to be a non-zero integer, found "5.1""`
    );
  });

  it('should throw if start is less than end, and step is negative', () => {
    expect(() => randomInteger(1, 5, -2)).toThrowErrorMatchingInlineSnapshot(
      `"Expected "step" to be positive if "start" is less than "end""`
    );
  });

  it('should throw if start is greater than end and step is positive', () => {
    expect(() => randomInteger(10, 4, 3)).toThrowErrorMatchingInlineSnapshot(
      `"Expected "step" to be negative if "start" is greater than "end""`
    );
  });

  it('should return a random number between a positive range', () => {
    expect(randomInteger(1, 10, 1)).toBeLessThanOrEqual(10);
    expect(randomInteger(1, 10, 1)).toBeGreaterThanOrEqual(1);
  });

  it('should return a random number between a negative range', () => {
    const randomNum = randomInteger(10, 3, -2);
    expect(randomNum).toBeLessThanOrEqual(10);
    expect(randomNum).toBeGreaterThanOrEqual(3);
    expect(randomNum % 2).toBe(0);
  });
});
