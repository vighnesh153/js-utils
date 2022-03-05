import { DeepReadonly } from 'ts-essentials';

/**
 * Deep freezes the object passed to it
 *
 * @param o - object to be frozen
 */
export const deepFreeze = <T>(o: T): DeepReadonly<T> => {
  Object.values(o).forEach((v) => Object.isFrozen(v) || deepFreeze(v));
  return Object.freeze(o) as DeepReadonly<T>;
};
