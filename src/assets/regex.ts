/**
 * Make a regex list to split words based on these patterns
 */

const regex = {
  name: "Regex List",
  description: "Regex patterns list to be used in functions",
  values: {
    upperCase: /[A-Z]/g,
    lowerCase: /[a-z]/g,
    spaceDash: /[^A-Za-z]/g,
  },
};

export { regex };
