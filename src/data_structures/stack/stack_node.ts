/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

/**
 * Internal class to be used only in stack's class.
 */
class StackNode<T> {
  public entry: T;

  public pointsTo: StackNode<T> | null = null;

  constructor(entry: T) {
    this.entry = entry;
  }
}

export default StackNode;
