import { randomInteger } from './random_integer';

/**
 * Bunch of random number utility functions
 *
 * <strong>Note</strong>: These functions are not
 * cryptographically strong and shouldn't be used in systems that
 * demand high security.
 */
export class Random {
  /**
   * Returns a random integer between start and end
   * @param start - beginning of the range
   * @param end - end of the range
   * @param step - increment or decrement for the numbers in range
   */
  static randomInteger = (start = 1, end = 10, step = 1) => {
    return randomInteger(start, end, step);
  };
}
