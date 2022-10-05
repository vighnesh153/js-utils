import { DeepReadonly } from 'ts-essentials';

/**
 * Deep freezes the object passed to it
 *
 * @param o - object to be frozen
 */
export function deepFreeze<T>(o: T): DeepReadonly<T> {
  if (o === null) return null as DeepReadonly<T>;

  if (Array.isArray(o)) {
    o.forEach((v) => Object.isFrozen(v) || deepFreeze(v));
  } else if (typeof o === 'object') {
    Object.values(o).forEach((v) => Object.isFrozen(v) || deepFreeze(v));
  }

  return Object.freeze(o) as DeepReadonly<T>;
}
