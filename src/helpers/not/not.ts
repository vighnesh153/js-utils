/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

/**
 * Returns the boolean negation of the value
 *
 * @param {any} value value to be boolean-negated
 * @returns {boolean} true, if the value is falsy, else, false
 */
const not = (value: any): boolean => {
  return Boolean(value) === false;
};

export default not;
