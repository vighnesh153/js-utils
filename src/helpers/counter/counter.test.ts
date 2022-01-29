import { Counter } from './counter';

describe('Helpers > Counter tests', () => {
  it('should allow to return unique keys', () => {
    const counter = new Counter([1, 2, 3, 2, 1, 2, 2]);

    const sortedUniqueKeys = counter
      .uniqueKeys()
      .sort((k1, k2) => k1.localeCompare(k2));

    expect(sortedUniqueKeys).toStrictEqual(['1', '2', '3']);
  });

  it('should allow to get count of a key', () => {
    const counter = new Counter([1, 2, 3, 3, 2, 3, 2]);

    expect(counter.countFor(2)).toBe(3);
  });

  it('should allow to return the most common entries and their count', () => {
    const counter = new Counter([1, 2, 3, 1, 2, 2, 1, 2, 5]);

    expect(counter.mostCommon(2)).toStrictEqual([
      { key: '2', count: 4 },
      { key: '1', count: 3 },
    ]);
  });

  it('should throw error if "mostCommon" is invoked with negative count', () => {
    const counter = new Counter([1, 2, 3, 1]);

    expect(() => counter.mostCommon(-2)).toThrowErrorMatchingInlineSnapshot(
      `"Expected \\"count\\" to be a positive integer, found \\"-2\\""`
    );
  });

  it('should throw error if "mostCommon" is invoked with decimal count', () => {
    const counter = new Counter([1, 2, 3, 1]);

    expect(() => counter.mostCommon(1.41)).toThrowErrorMatchingInlineSnapshot(
      `"Expected \\"count\\" to be a positive integer, found \\"1.41\\""`
    );
  });

  it('should allow to return the least common entries and their count', () => {
    const counter = new Counter([1, 2, 3, 1, 2, 2, 1, 2, 5, 3]);

    expect(counter.leastCommon(2)).toStrictEqual([
      { key: '5', count: 1 },
      { key: '3', count: 2 },
    ]);
  });

  it('should throw error if "leastCommon" is invoked with negative count', () => {
    const counter = new Counter([1, 2, 3, 1]);

    expect(() => counter.leastCommon(-2)).toThrowErrorMatchingInlineSnapshot(
      `"Expected \\"count\\" to be a positive integer, found \\"-2\\""`
    );
  });

  it('should throw error if "leastCommon" is invoked with decimal count', () => {
    const counter = new Counter([1, 2, 3, 1]);

    expect(() => counter.leastCommon(1.41)).toThrowErrorMatchingInlineSnapshot(
      `"Expected \\"count\\" to be a positive integer, found \\"1.41\\""`
    );
  });

  it('should allow to return the keys and their count at once', () => {
    const counter = new Counter([4, 2, 3, 3, 2, 2, 3, 3, 4, 1]);

    expect(counter.getItems()).toStrictEqual({
      1: 1,
      2: 3,
      3: 4,
      4: 2,
    });
  });
});
