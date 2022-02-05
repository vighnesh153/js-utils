import { memoize } from '@utils';

describe('Helpers > memoize tests', () => {
  it('should not invoke function twice', () => {
    const add = jest.fn((a: number, b: string) => a + b);
    const memoizedAdd = memoize(add);

    const invoke = () => memoizedAdd(1, 'a');
    const expectedReturnValue = '1a';

    // Should return same result always
    expect(invoke()).toBe(expectedReturnValue);
    expect(invoke()).toBe(expectedReturnValue);
    expect(invoke()).toBe(expectedReturnValue);

    // Should have only invoked "add" once
    expect(add).toHaveBeenCalledTimes(1);
  });

  it('should support memoization for function which accepts complex objects', () => {
    const returnMapValues = jest.fn((map: Map<number, number>) => {
      return Array.from(map.values());
    });

    const memoizedReturnMapValues = memoize(returnMapValues, (map) =>
      JSON.stringify(Array.from(map.entries()))
    );

    const map = new Map([
      [1, 1],
      [2, 4],
      [3, 9],
    ]);

    // Should return same result for same argument
    expect(memoizedReturnMapValues(map)).toStrictEqual([1, 4, 9]);
    expect(memoizedReturnMapValues(map)).toStrictEqual([1, 4, 9]);

    // If called with same argument, it should invoke the original
    // function only once
    expect(returnMapValues).toBeCalledTimes(1);

    map.set(4, 16);

    //
    expect(memoizedReturnMapValues(map)).toStrictEqual([1, 4, 9, 16]);
    expect(memoizedReturnMapValues(map)).toStrictEqual([1, 4, 9, 16]);

    expect(returnMapValues).toBeCalledTimes(2);
  });
});
