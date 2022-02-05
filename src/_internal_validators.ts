import { isInteger, not } from '@utils';

export class Validators {
  static validateInteger = (value: any, argName: string) => {
    if (not(isInteger(value))) {
      throw new Error(`Expected "${argName}" to be integer, found "${value}"`);
    }
  };

  static validatePositiveInteger = (value: any, argName: string) => {
    if (not(isInteger(value)) || value <= 0) {
      throw new Error(
        `Expected "${argName}" to be a positive integer, found "${value}"`
      );
    }
  };

  static validateNonNegativeInteger = (value: any, argName: string) => {
    if (not(isInteger(value)) || value < 0) {
      throw new Error(
        `Expected "${argName}" to be a non-negative integer, found "${value}"`
      );
    }
  };

  static validateNonZeroInteger = (value: any, argName: string) => {
    if (not(isInteger(value)) || value === 0) {
      throw new Error(
        `Expected "${argName}" to be a non-zero integer, found "${value}"`
      );
    }
  };
}
