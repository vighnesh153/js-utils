import { not } from 'src/helpers/not';
import { isInteger } from 'src/math/numbers/is_integer';

const validateStart = (start: number) => {
  if (not(isInteger(start))) {
    throw new Error(`Expected "start" to be integer, found "${start}"`);
  }
};

const validateEnd = (end: number) => {
  if (not(isInteger(end))) {
    throw new Error(`Expected "end" to be integer, found "${end}"`);
  }
};

const validateStep = (step: number, start: number, end: number) => {
  if (not(isInteger(step)) || step === 0) {
    throw new Error(
      `Expected "step" to be a non-zero integer, found "${step}"`
    );
  }
  if (start < end && step < 0) {
    throw new Error(
      `Expected "step" to be positive if "start" is less than "end"`
    );
  }
  if (start > end && step > 0) {
    throw new Error(
      `Expected "step" to be negative if "start" is greater than "end"`
    );
  }
};

export const randomInteger = (
  start: number,
  end: number,
  step: number
): number => {
  validateStart(start);
  validateEnd(end);
  validateStep(step, start, end);

  const count = Math.floor((end - start) / step) + 1;
  return start + Math.floor(Math.random() * count) * step;
};
