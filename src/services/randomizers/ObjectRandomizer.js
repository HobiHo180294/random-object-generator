const StringRandomizer = require('./StringRandomizer');

class ObjectRandomizer {
  #_stringRandomizer;

  constructor() {
    this.#_stringRandomizer = new StringRandomizer();
  }

  generateRandomObject(pairs = 3) {
    const randomObject = {};

    for (let i = 0; i < pairs; i++) {
      const randomKey = `key${i + 1}`;
      const randomValue = this.#_stringRandomizer.generateString();
      randomObject[randomKey] = randomValue;
    }

    return randomObject;
  }
}

module.exports = ObjectRandomizer;
