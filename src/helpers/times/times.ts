import { Validators } from 'src/_internal_validators';

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
export function times(n: number): TimesReturnValue {
  Validators.validatePositiveInteger(n, 'n');

  return {
    do: <T>(callback: (count: number) => T): T[] => {
      const result: T[] = [];
      for (let i = 1; i <= n; i += 1) {
        result.push(callback(i));
      }
      return result;
    },
  };
}
