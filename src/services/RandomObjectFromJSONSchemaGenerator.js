const {
  ObjectRandomizer,
  ArrayRandomizer,
  URLRandomizer,
  NumericRandomizer,
  BooleanRandomizer,
} = require('./randomizers');

class RandomObjectFromJSONSchemaGenerator {
  #_objectRandomizer;
  #_arrayRandomizer;
  #_urlRandomizer;
  #_numericRandomizer;
  #_booleanRandomizer;
  #_schema;
  #_definitions;
  #_idMap;

  constructor(schema) {
    const buildIdMap = definitions => {
      const idMap = new Map();
      for (const value of Object.values(definitions)) {
        if (value.$id) {
          idMap.set(value.$id, value);
        }
      }
      return idMap;
    };

    this.#_objectRandomizer = new ObjectRandomizer();
    this.#_arrayRandomizer = new ArrayRandomizer();
    this.#_urlRandomizer = new URLRandomizer();
    this.#_numericRandomizer = new NumericRandomizer();
    this.#_booleanRandomizer = new BooleanRandomizer();

    this.#_schema = schema;
    this.#_definitions = schema.definitions || {};
    if (this.#_definitions) this.#_idMap = buildIdMap(this.#_definitions);
  }

  generate() {
    const resolvedSchema = this.#_resolveReference(this.#_schema);
    return this.#_processFromSchema(resolvedSchema);
  }

  #_processFromSchema(schema) {
    if (schema?.type) {
      switch (schema.type) {
        case 'object':
          if (schema?.properties) {
            return this.#_processObjectFromProperties(
              schema.properties,
              schema.required
            );
          } else return this.#_objectRandomizer.generateRandomObject();

        case 'array':
          if (schema?.default && Math.random() < 0.3) {
            return schema.default;
          } else return this.#_processArray(schema);

        default:
          return this.#_processValue(schema);
      }
    }

    return this.#_processValue(schema);
  }

  #_processObjectFromProperties(properties, required = []) {
    const processedObject = {};

    for (const [key, schemaProp] of Object.entries(properties)) {
      if (required.includes(key) || Math.random() < 0.7) {
        processedObject[key] = this.#_processFromSchema(schemaProp);
      }
    }

    return processedObject;
  }

  #_processArray(schema) {
    if (schema?.items) {
      const itemSchema = this.#_resolveReference(schema.items);
      return this.#_arrayRandomizer.generateRandomArray(
        1,
        1,
        this.#_processFromSchema(itemSchema)
      );
    }

    return this.#_arrayRandomizer.generateRandomArray(1, 3, 'string');
  }

  #_resolveReference(schema) {
    if (schema?.$ref) {
      const refKey = schema.$ref;
      if (this.#_idMap.has(refKey)) {
        return this.#_idMap.get(refKey);
      } else {
        throw new Error(
          `Definition with $id '${refKey}' not found in schema definitions.`
        );
      }
    }

    return schema;
  }

  #_processValue(schema) {
    if (schema?.enum) {
      return schema.enum[Math.floor(Math.random() * schema.enum.length)];
    }

    if (schema?.anyOf) {
      const selectedSchema =
        schema.anyOf[Math.floor(Math.random() * schema.anyOf.length)];
      return this.#_processValue(selectedSchema);
    }

    if (schema?.$ref) {
      const resolvedSchema = this.#_resolveReference(schema);
      return this.#_processValue(resolvedSchema);
    }

    if (schema?.type) {
      switch (schema.type) {
        case 'string':
          if (schema?.pattern) {
            return this.#_urlRandomizer.generateURLFromRegExp(schema.pattern);
          }
          return this.#_urlRandomizer.generateString();
        case 'integer':
          return this.#_numericRandomizer.generateInteger(
            schema?.minimum,
            schema?.maximum
          );
        case 'number':
          return this.#_numericRandomizer.generateNumber();
        case 'boolean':
          return this.#_booleanRandomizer.generateBoolean();
        case 'null':
          return null;
        case 'object':
          return this.#_processObjectFromProperties(
            schema.properties,
            schema.required
          );
        case 'array':
          return this.#_processArray(schema);
        default:
          return undefined;
      }
    }

    return null;
  }
}

module.exports = RandomObjectFromJSONSchemaGenerator;
