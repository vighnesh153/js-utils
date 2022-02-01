import { isInteger, not } from '@utils';

/**
 * Return type of the "times" function
 */
export interface TimesReturnValue {
  /**
   * Invokes the callback "n" number of times
   *
   * @typeParam T - return type of the callback
   * @param callback - callback with the iteration number as argument
   */
  do: <T>(cb: (count: number) => T) => T[];
}

/**
 * Helper function that helps to do repeated stuff
 *
 * @param n - number of times
 */
export const times = (n: number): TimesReturnValue => {
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
