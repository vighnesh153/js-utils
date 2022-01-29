export interface DateComparisonHelpers {
  sameAs: (compareWithDate: Date) => boolean;
  before: (compareWithDate: Date) => boolean;
  onOrBefore: (compareWithDate: Date) => boolean;
  after: (compareWithDate: Date) => boolean;
  onOrAfter: (compareWithDate: Date) => boolean;
}

/**
 * Date comparison helpers
 *
 * @param date - Compare this date with some other date
 */
export const is = (date: Date): DateComparisonHelpers => {
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
};
