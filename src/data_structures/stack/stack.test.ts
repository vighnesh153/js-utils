/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import Stack from './stack';

describe('Data Structures > Stack tests', () => {
  it('should allow to initialize the stack', () => {
    const stack = new Stack(1, 2, 3);
    expect(stack).toBeDefined();
  });

  it('should allow to convert the stack into an array', () => {
    const stack = new Stack(1, 2, 3, 4);
    expect(stack.toArray()).toStrictEqual([1, 2, 3, 4]);
  });

  it('should allow to push entries to the stack', () => {
    const stack = new Stack(1);
    stack.push(2, 3);
    expect(stack.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should allow to pop out entries from the stack', () => {
    const stack = new Stack(1, 2, 3, 4, 5, 6);
    stack.pop();
    expect(stack.toArray()).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it('should return the popped element', () => {
    const stack = new Stack(1, 2, 3, 4);
    const poppedElement = stack.pop();
    expect(poppedElement).toBe(4);
  });

  it('should allow to peek into the stack', () => {
    const stack = new Stack(1, 2, 3);
    const peekedElement = stack.peek();
    expect(peekedElement).toBe(3);
  });

  it('should not modify the stack when peeking into it', () => {
    const stack = new Stack(1, 2, 3);
    stack.peek();
    expect(stack.toArray()).toStrictEqual([1, 2, 3]);
  });

  it('should return the size of the stack as 0 if empty', () => {
    const stack = new Stack();
    expect(stack.size).toBe(0);
  });

  it('should return the correct size of stack if stack has entries', () => {
    const stack = new Stack(1, 2, 3, 4);
    expect(stack.size).toBe(4);
  });

  it('should allow to reverse the stack', () => {
    const stack = new Stack(1, 2, 3, 4);
    const reversedStack = stack.reverse();
    expect(reversedStack.toArray()).toStrictEqual([4, 3, 2, 1]);
  });

  it('should not update the source stack when reversing', () => {
    const stack = new Stack(1, 2, 3, 4);
    stack.reverse();
    expect(stack.toArray()).toStrictEqual([1, 2, 3, 4]);
  });

  it('should allow to clone the stack', () => {
    const stack = new Stack(1, 2, 3, 4);
    const clonedStack = stack.clone();
    expect(clonedStack.toArray()).toStrictEqual([1, 2, 3, 4]);
  });

  it('should return a new instance of the stack when cloning', () => {
    const stack = new Stack(1, 2, 3);
    const clonedStack = stack.clone();
    expect(clonedStack).not.toBe(stack);
  });

  it('should use the clonedEntry callback if provided', () => {
    const stack = new Stack({ a: 1 });
    const clonedStack = stack.clone((e) => ({ ...e }));
    expect(clonedStack.peek()).toStrictEqual(stack.peek());
  });
});
