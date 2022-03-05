/**
 * Shuffle an iterable
 *
 * @param iterable - array or string to be shuffled
 */
export const shuffle = <T>(iterable: Iterable<T>): T[] => {
  return Array.from(iterable).sort(() => (Math.random() < 0.5 ? -1 : 1));
};
