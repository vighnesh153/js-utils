/**
 * Some utility constants
 */
export class Constants {
  /**
   * All the digits from 0 to 9
   */
  static digits = '0123456789';

  /**
   * All the digits for a hex-representation of a number
   */
  static hexDigits = '0123456789abcdefABCDEF';

  /**
   * All the digits for an octal-representation of a number
   */
  static octalDigits = '01234567';

  /**
   * All whitespace characters
   */
  static whitespace = ' \t';

  /**
   * All lowercase english alphabet letters
   */
  static lowercaseAlphabet = 'abcdefghijklmnopqrstuvwxyz';

  /**
   * All uppercase english alphabet letters
   */
  static uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  /**
   * All english alphabet letters (both lowercase and uppercase)
   */
  static alphabet = Constants.lowercaseAlphabet + Constants.uppercaseAlphabet;

  /**
   * All punctuation characters
   */
  static punctuation = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;

  /**
   * All the characters that can be printed
   */
  static printableCharacters = Constants.digits + Constants.alphabet + Constants.punctuation + Constants.whitespace;

  private constructor() {
    throw new Error(`Don't instantiate or inherit the Constants class`);
  }
}
