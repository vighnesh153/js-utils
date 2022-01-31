import { isInteger, not } from '@utils';

export const throwIfNotInteger = (value: any, argName: string) => {
  if (not(isInteger(value))) {
    throw new Error(`Expected "${argName}" to be integer, found "${value}"`);
  }
};
