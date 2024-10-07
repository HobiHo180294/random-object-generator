const NumericRandomizer = require('./NumericRandomizer');
const BooleanRandomizer = require('./BooleanRandomizer');
const StringRandomizer = require('./StringRandomizer');
const ObjectRandomizer = require('./ObjectRandomizer');
const { getArrayLength } = require('../../utils/functions/array.functions');

class ArrayRandomizer {
  #_numericRandomizer;
  #_stringRandomizer;
  #_booleanRandomizer;
  #_objectRandomizer;

  constructor() {
    this.#_numericRandomizer = new NumericRandomizer();
    this.#_stringRandomizer = new StringRandomizer();
    this.#_booleanRandomizer = new BooleanRandomizer();
    this.#_objectRandomizer = new ObjectRandomizer();
  }

  #_generateItem(items) {
    switch (items) {
      case 'string':
        return this.#_stringRandomizer.generateString();
      case 'number':
        return this.#_numericRandomizer.generateNumber();
      case 'integer':
        return this.#_numericRandomizer.generateInteger();
      case 'object':
        return this.#_objectRandomizer.generateRandomObject();
      case 'array':
        return this.generateRandomArray();
      case 'boolean':
        return this.#_booleanRandomizer.generateBoolean();
      case 'null':
        return null;
      case 'undefined':
        return undefined;
      default:
        return items;
    }
  }

  generateRandomArray(
    minItems = 1,
    maxItems = 3,
    items = 'string',
    uniqueitems = false
  ) {
    const length = getArrayLength(minItems, maxItems);

    const resultStructure = uniqueitems ? new Set() : [];

    if (uniqueitems) {
      while (resultStructure.size < length) {
        resultStructure.add(this.#_generateItem(items));
      }
    } else {
      while (resultStructure.length < length) {
        resultStructure.push(this.#_generateItem(items));
      }
    }

    return uniqueitems ? [...resultStructure] : resultStructure;
  }
}

module.exports = ArrayRandomizer;
