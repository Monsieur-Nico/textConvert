/**
 * Make a regex list to split words based on these patterns
 */

const regex = {
  name: 'Regex List',
  description: 'Regex patterns list to be used in functions',
  values: {
    upperCase: /[A-Z]/g,
    upperCaseKeepLetter: /(?=[A-Z])/g,
    lowerCase: /[a-z]/g,
    lowerUpperCase: /[A-Za-z]/g,
    nonAlphabetic: /[^A-Za-z]/g,
    nonAlphaTest: /[^A-Za-z]/,
    punctuation: /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g,
    nonAlphaNumeric: /[^A-Za-z0-9]+/g,
  },
};

export { regex };
