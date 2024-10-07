const generateRandomObjectFromJSONSchema = require('./index');
const { INVALID_SCHEMA } = require('./utils/constants/errors.constants');
const schemaJSON = require('./data/schema');

describe('generateRandomObjectFromJSONSchema', () => {
  it('throws error when input is not an object', () => {
    const invalidInputs = [
      null,
      undefined,
      42,
      'string',
      true,
      () => {},
      Symbol('symbol'),
    ];

    invalidInputs.forEach(input => {
      expect(() => generateRandomObjectFromJSONSchema(input)).toThrow(
        INVALID_SCHEMA
      );
    });
  });

  it('throws error when input is an array', () => {
    expect(() => generateRandomObjectFromJSONSchema([])).toThrow(
      INVALID_SCHEMA
    );
    expect(() => generateRandomObjectFromJSONSchema([{}])).toThrow(
      INVALID_SCHEMA
    );
  });

  it('does not throw error when input is a valid object', () => {
    expect(() => generateRandomObjectFromJSONSchema(schemaJSON)).not.toThrow();
  });
});
