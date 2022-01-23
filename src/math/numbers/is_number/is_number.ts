/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

/**
 * Checks if the value provided is number
 *
 * @param {any} value value under test
 * @returns {boolean} true, if value is a number, else, false
 */
const isNumber = (value: any): boolean => {
  return typeof value === 'number';
};

export default isNumber;
