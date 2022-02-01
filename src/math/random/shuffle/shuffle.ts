import { randomInteger, range } from '@utils';

/**
 * Shuffle an iterable
 *
 * @param iterable - array or string to be shuffled
 */
export const shuffle = <T>(iterable: Iterable<T>): T[] => {
  const array = Array.from(iterable);
  const iterableLength = array.length;

  // For each index, swap itself with any random index lower than itself
  Array.from(range(iterableLength - 1, 0, -1)).forEach((index) => {
    const swapIndex = index === 0 ? 0 : randomInteger(0, index - 1, 1);
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  });

  return array;
};
