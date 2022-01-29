import { DateComparisonHelpers, is } from './is';

export type { DateComparisonHelpers };

/**
 * A bunch of Date-Time utility functions
 */
export class DateTimeUtils {
  /**
   * Date comparison utilities
   */
  static is: (date: Date) => DateComparisonHelpers = is;
}
