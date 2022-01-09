/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import HelloWorld from '.';

describe('HelloWorld tests', () => {
  it('should be able to instantiate HelloWorld class', () => {
    const helloWorld = new HelloWorld('Vighnesh');
    expect(helloWorld).not.toBeNull();
  });
});
