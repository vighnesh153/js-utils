/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import StackNode from './stack_node';

/**
 * @classdesc This is a stack class
 */
class Stack<T> {
  /**
   * Returns the size of the stack
   *
   * @returns { number } count of entries in stack
   */
  public size: number = 0;

  /**
   * @private
   */
  private head: StackNode<T> | null = null;

  /**
   * @function Object() { [native code] }
   * @param entries
   */
  constructor(...entries: T[]) {
    this.push(...entries);
  }

  /**
   * Get the top-most entry from the stack. If stack is empty, returns null.
   *
   * @returns { T | null } the top-entry element from the stack
   */
  peek = (): T | null => {
    // stack is empty
    if (this.isEmpty()) {
      return null;
    }
    return this.head!.entry;
  };

  /**
   * Checks if the stack has any elements or not.
   *
   * @returns { boolean } true, if stack is empty, else, false
   */
  isEmpty = (): boolean => {
    return this.size === 0;
  };

  /**
   * Adds single or multiple entries to the stack
   *
   * @param {T[]} [entries=[]] All entries to be added to the stack
   * @returns { void }
   */
  push = (...entries: T[]): void => {
    entries.forEach(this.pushOne);
  };

  /**
   * Removes the top-most entry from the stack and returns its value.
   * If the stack is empty, returns, null.
   *
   * @returns { T | null } top element from the stack
   */
  pop = (): T | null => {
    if (this.isEmpty()) {
      return null;
    }

    // Decrement the stack size
    this.size -= 1;

    // Remove the node and set head to the next node
    const toRemoveNode = this.head!;
    this.head = toRemoveNode.pointsTo;

    // Return the node's value
    return toRemoveNode.entry;
  };

  /**
   * Creates a new stack with order of entries in reverse order
   *
   * @returns { Stack<T> } new stack with reversed entries
   */
  reverse = (): Stack<T> => {
    return new Stack<T>(...this.toArray().reverse());
  };

  /**
   * Converts the stack to array. Order is from bottom to top of stack.
   *
   * @returns { T[] } array of all the entries from stack
   */
  toArray = (): T[] => {
    const result: T[] = [];

    let currentNode = this.head;
    while (currentNode !== null) {
      result.push(currentNode.entry);
      currentNode = currentNode.pointsTo;
    }

    // Should return in reverse as it is converting to array from "top" of stack
    return result.reverse();
  };

  /**
   * Clones the stack into new object
   *
   * @param cloneEntry Callback to clone the entry. Useful if you want to deep-clone the stack.
   * By default, returns the same entry
   * @returns { Stack<T> }
   */
  clone = (cloneEntry: (entry: T) => T = (entry) => entry): Stack<T> => {
    const clonedStack = new Stack<T>();
    clonedStack.push(...this.toArray().map(cloneEntry));
    return clonedStack;
  };

  /**
   * @param entry
   * @private
   * Pushes one entry to the stack
   */
  private pushOne = (entry: T): void => {
    const newNode = new StackNode(entry);
    this.size += 1;

    // stack is empty
    if (this.head === null) {
      this.head = newNode;
      return;
    }

    // stack has at least 1 entry
    newNode.pointsTo = this.head;
    this.head = newNode;
  };
}

export default Stack;
