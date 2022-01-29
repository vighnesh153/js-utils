import { is } from './is';

describe('Helpers > DateTimeUtils', () => {
  it('should have a function to check if 2 dates are same', () => {
    const date = new Date();
    expect(is(date).sameAs(date)).toBe(true);
  });

  it('should have a function to check if 1 date is before other', () => {
    const date1 = new Date();
    const date2 = new Date(Date.now() + 123);
    expect(is(date1).before(date2)).toBe(true);
  });

  it('should have a function to check if 1 date is onOrBefore other', () => {
    const date1 = new Date();
    const date2 = new Date(Date.now() + 123);
    expect(is(date1).onOrBefore(date2)).toBe(true);
  });

  it('should have a function to check if 1 date is after other', () => {
    const date1 = new Date(Date.now() + 123);
    const date2 = new Date();
    expect(is(date1).after(date2)).toBe(true);
  });

  it('should have a function to check if 1 date is onOrAfter other', () => {
    const date1 = new Date(Date.now() + 123);
    const date2 = new Date();
    expect(is(date1).onOrAfter(date2)).toBe(true);
  });
});
