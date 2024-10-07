const schemaJSON = require('./data/schema');
const RandomObjectFromJSONSchemaGenerator = require('./services/RandomObjectFromJSONSchemaGenerator');
const { INVALID_SCHEMA } = require('./utils/constants/errors.constants');

function generateRandomObjectFromJSONSchema(schema) {
  if (
    !(
      Object.prototype.toString.call(schema) === '[object Object]' &&
      !Array.isArray(schema)
    )
  ) {
    throw new Error(INVALID_SCHEMA);
  }

  const generator = new RandomObjectFromJSONSchemaGenerator(schema);
  return generator.generate();
}

console.log(
  'Random Object Based On JSON Schema:',
  generateRandomObjectFromJSONSchema(schemaJSON),
  performance.now()
);

module.exports = generateRandomObjectFromJSONSchema;
