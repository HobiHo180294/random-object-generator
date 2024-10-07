const { ALPHANUMERIC } = require('../../utils/constants/patterns.constants');

class StringRandomizer {
  generateString(characters = ALPHANUMERIC.characters, length = 10) {
    return Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join('');
  }
}

module.exports = StringRandomizer;
