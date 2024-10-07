const schemaJSON = require('./data/schema');
const RandomObjectFromJSONSchemaGenerator = require('./services/RandomObjectFromJSONSchemaGenerator');

function generateRandomObjectFromJSONSchema(schema) {
  const generator = new RandomObjectFromJSONSchemaGenerator(schema);
  return generator.generate();
}
console.log(
  'Random Object Based On JSON Schema:',
  generateRandomObjectFromJSONSchema(schemaJSON)
);
