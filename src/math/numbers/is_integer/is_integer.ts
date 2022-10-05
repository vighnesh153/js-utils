/**
 * Checks if the provided value is an integer
 *
 * @param value - value under test
 */
export function isInteger(value: any): boolean {
  if (typeof value !== 'number') {
    return false;
  }
  return parseInt(`${value}`, 10) === value;
}
