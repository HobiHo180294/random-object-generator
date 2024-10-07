const {
  LOWERCASE_LETTERS,
  DIGITS,
  ALPHANUMERIC,
} = require('../../utils/constants/patterns.constants');
const { checkURLValidity } = require('../../utils/functions/url.functions');
const StringRandomizer = require('./StringRandomizer');

class URLRandomizer extends StringRandomizer {
  constructor() {
    super();
  }

  generateURLFromRegExp(regExp) {
    let filteredURL = regExp.replace(/\\/g, '');

    const lowercaseLettersMatch = this.generateString(
      LOWERCASE_LETTERS.characters,
      2
    );
    const digitsMatch = this.generateString(DIGITS.characters, 3);
    const alphanumericMatch = this.generateString(ALPHANUMERIC.characters);

    const patternMappings = {
      [LOWERCASE_LETTERS.pattern]: lowercaseLettersMatch,
      [DIGITS.pattern]: digitsMatch,
      [ALPHANUMERIC.pattern]: alphanumericMatch,
    };

    for (const [pattern, replacement] of Object.entries(patternMappings)) {
      filteredURL = filteredURL.replace(pattern, replacement);
    }

    const check = checkURLValidity(filteredURL);

    if (!check.result) throw new Error(check.message);

    return filteredURL;
  }
}

module.exports = URLRandomizer;
