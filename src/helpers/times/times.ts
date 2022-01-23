/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import isInteger from 'src/math/numbers/is_integer';
import not from 'src/helpers/not';

interface TimesReturnValue {
  /**
   * Invokes the callback "n" number of times
   *
   * @template T
   * @param {function(number): T} callback callback with
   * the iteration number as argument
   * @returns {T[]} returns the output of callback as array
   */
  do: <T>(cb: (count: number) => T) => T[];
}

/**
 * Helper function that helps to do repeated stuff
 *
 * @param {number} n number of times
 * @returns {TimesReturnValue} utilities to do things for
 * "n" number of times
 */
const times = (n: number): TimesReturnValue => {
  if (not(isInteger(n)) || n <= 0) {
    throw new Error(`Expected "n" to be a positive integer, found "${n}"`);
  }

  return {
    do: <T>(callback: (count: number) => T): T[] => {
      const result: T[] = [];
      for (let i = 1; i <= n; i += 1) {
        result.push(callback(i));
      }
      return result;
    },
  };
};

export default times;
