/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

/**
 * Checks if the provided value is an integer
 *
 * @param {any} value value under test
 * @returns {boolean} true, if the value is integer, else, false
 */
const isInteger = (value: any): boolean => {
  if (typeof value !== 'number') {
    return false;
  }
  return parseInt(`${value}`, 10) === value;
};

export default isInteger;
