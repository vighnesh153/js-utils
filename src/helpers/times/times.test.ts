/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import times from './times';

describe('Helpers > times tests', () => {
  it('should throw error if count is negative or non-integer', () => {
    expect(() => {
      times(-10).do(() => null);
    }).toThrowErrorMatchingInlineSnapshot(
      `"Expected \\"n\\" to be a positive integer, found \\"-10\\""`
    );
  });

  it('should do something "n" number of times', () => {
    const cb = jest.fn();
    const repeatCount = 10;
    times(repeatCount).do(cb);
    expect(cb).toBeCalledTimes(repeatCount);
  });

  it('should invoke the callback with the count of iteration', () => {
    const cb = jest.fn();
    times(3).do(cb);

    expect(cb).toHaveBeenNthCalledWith(1, 1);
    expect(cb).toHaveBeenNthCalledWith(2, 2);
    expect(cb).toHaveBeenNthCalledWith(3, 3);
  });
});
