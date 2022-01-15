/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import StackNode from './stack_node';

class Stack<T> {
  /**
   * Returns the size of the stack
   */
  public size: number = 0;

  private head: StackNode<T> | null = null;

  constructor(...entries: T[]) {
    this.push(...entries);
  }

  /**
   * Get the top-most entry from the stack. If stack is empty, returns null.
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
   */
  isEmpty = (): boolean => {
    return this.size === 0;
  };

  /**
   * Adds single or multiple entries to the stack
   *
   * @param entries All entries to be added to the stack
   */
  push = (...entries: T[]): void => {
    entries.forEach(this.pushOne);
  };

  /**
   * Removes the top-most entry from the stack and returns its value.
   * If the stack is empty, returns, null.
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
   */
  reverse = (): Stack<T> => {
    return new Stack<T>(...this.toArray().reverse());
  };

  /**
   * Converts the stack to array
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
   */
  clone = (cloneEntry: (entry: T) => T = (entry) => entry): Stack<T> => {
    const clonedStack = new Stack<T>();
    clonedStack.push(...this.toArray().map(cloneEntry));
    return clonedStack;
  };

  /**
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
