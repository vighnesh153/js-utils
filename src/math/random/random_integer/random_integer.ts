import { Validators } from 'src/_internal_validators';

const validateStep = (step: number, start: number, end: number) => {
  Validators.validateNonZeroInteger(step, 'step');
  if (start < end && step < 0) {
    throw new Error(`Expected "step" to be positive if "start" is less than "end"`);
  }
  if (start > end && step > 0) {
    throw new Error(`Expected "step" to be negative if "start" is greater than "end"`);
  }
};

/**
 * Returns a random integer between start and end
 *
 * <strong>Note</strong>: This is not cryptographically strong
 * and shouldn't be used in systems that demand high security.
 *
 * @param start - beginning of the range
 * @param end - end of the range
 * @param step - increment or decrement for the numbers in range
 *
 * @throws Expected "start" to be integer
 * @throws Expected "end" to be integer
 * @throws Expected "step" to be <strong>non-zero</strong> integer
 * @throws Expected "step" to be positive if "start" is less than "end"
 * @throws Expected "step" to be negative if "start" is greater than "end"
 */
export function randomInteger(start: number, end: number, step = 1): number {
  Validators.validateInteger(start, 'start');
  Validators.validateInteger(end, 'end');
  validateStep(step, start, end);

  const count = Math.floor((end - start) / step) + 1;
  return start + Math.floor(Math.random() * count) * step;
}
