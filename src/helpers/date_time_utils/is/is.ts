/**
 * Date comparison helpers
 */
export interface DateComparisonHelpers {
  /**
   * Checks if one date is the same as the other
   *
   * @param compareWithDate - Date to compare with
   */
  sameAs: (compareWithDate: Date) => boolean;

  /**
   * Checks if one date is before the other
   *
   * @param compareWithDate - Date to compare with
   */
  before: (compareWithDate: Date) => boolean;

  /**
   * Checks if one date is on or before the other
   *
   * @param compareWithDate - Date to compare with
   */
  onOrBefore: (compareWithDate: Date) => boolean;

  /**
   * Checks if one date is after the other
   *
   * @param compareWithDate - Date to compare with
   */
  after: (compareWithDate: Date) => boolean;

  /**
   * Checks if one date is on or after the other
   *
   * @param compareWithDate - Date to compare with
   */
  onOrAfter: (compareWithDate: Date) => boolean;
}

/**
 * Date comparison helpers
 *
 * @param date - Compare this date with some other date
 */
export function is(date: Date): DateComparisonHelpers {
  const initialTime = date.getTime();

  const sameAs = (compareWithDate: Date): boolean => {
    return initialTime === compareWithDate.getTime();
  };

  const before = (compareWithDate: Date): boolean => {
    return initialTime < compareWithDate.getTime();
  };

  const onOrBefore = (compareWithDate: Date): boolean => {
    return sameAs(compareWithDate) || before(compareWithDate);
  };

  const after = (compareWithDate: Date): boolean => {
    return initialTime > compareWithDate.getTime();
  };

  const onOrAfter = (compareWithDate: Date): boolean => {
    return sameAs(compareWithDate) || after(compareWithDate);
  };

  return {
    sameAs,
    before,
    onOrBefore,
    after,
    onOrAfter,
  };
}
