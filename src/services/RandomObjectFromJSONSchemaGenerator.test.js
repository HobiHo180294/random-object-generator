const RandomObjectFromJSONSchemaGenerator = require('./RandomObjectFromJSONSchemaGenerator');
const schemaJSON = require('../data/schema');
const { checkURLValidity } = require('../utils/functions/url.functions');

describe('RandomObjectFromJSONSchemaGenerator', () => {
  let generator;

  it('generates an object from simple schema', () => {
    const mockSchema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'integer' },
        isStudent: { type: 'boolean' },
      },
      required: ['name', 'age'],
    };

    generator = new RandomObjectFromJSONSchemaGenerator(mockSchema);
    const result = generator.generate();

    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('age');
    expect(typeof result.name).toBe('string');
    expect(typeof result.age).toBe('number');

    if ('isStudent' in result) {
      expect(typeof result.isStudent).toBe('boolean');
    } else {
      expect(result).not.toHaveProperty('isStudent');
    }
  });

  it('generates an array from simple schema', () => {
    const mockSchema = {
      type: 'array',
      items: { type: 'string' },
    };

    generator = new RandomObjectFromJSONSchemaGenerator(mockSchema);
    const result = generator.generate();
    expect(Array.isArray(result)).toBe(true);
  });

  it('handles enum values', () => {
    const colorsEnum = ['red', 'green', 'blue'];

    const mockSchema = {
      type: 'string',
      enum: colorsEnum,
    };

    generator = new RandomObjectFromJSONSchemaGenerator(mockSchema);
    const result = generator.generate();
    expect(colorsEnum).toContain(result);
  });

  it('handles anyOf correctly', () => {
    const mockSchema = {
      anyOf: [{ type: 'string' }, { type: 'number' }],
    };
    generator = new RandomObjectFromJSONSchemaGenerator(mockSchema);
    const result = generator.generate();

    if (typeof result === 'string') {
      expect(typeof result).toBe('string');
    } else {
      expect(typeof result).toBe('number');
    }
  });

  it('generates all required properties correctly based on the provided schema', () => {
    generator = new RandomObjectFromJSONSchemaGenerator(schemaJSON);
    const result = generator.generate();

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('startDate');
    expect(result).toHaveProperty('endDate');
    expect(result).toHaveProperty('attendees');

    expect(['string', 'number']).toContain(typeof result.id);
    expect(typeof result.title === 'string').toBeTruthy();
    expect(typeof result.description === 'string').toBeTruthy();
    expect(Number.isInteger(result.startDate)).toBeTruthy();
    expect(Number.isInteger(result.endDate)).toBeTruthy();
    expect(Array.isArray(result.attendees)).toBeTruthy();
  });

  it('displays correctly optional values', () => {
    generator = new RandomObjectFromJSONSchemaGenerator(schemaJSON);
    const result = generator.generate();

    if (result?.parentId) {
      expect(['object', 'string', 'number']).toContain(typeof result.parentId);

      if (typeof result.parentId === 'number') {
        expect(Number.isInteger(result.parentId)).toBeTruthy();
      } else if (typeof result.parentId === 'object') {
        expect(result.parentId).toBeNull();
      }
    }

    if (result?.locationId) {
      expect(['object', 'number']).toContain(typeof result.locationId);

      if (typeof result.locationId === 'number') {
        expect(Number.isInteger(result.locationId)).toBeTruthy();
      } else {
        expect(result.locationId).toBeNull();
      }
    }

    if (result?.process) {
      expect(['object', 'string']).toContain(typeof result.process);

      if (typeof result.process === 'string') {
        expect(checkURLValidity(result.process)).toBeTruthy();
      } else {
        expect(result.process).toBeNull();
      }
    }

    if (result?.readOnly) {
      expect(typeof result?.readOnly).toBe('boolean');
    }

    if (result?.readOnly) {
      expect(typeof result?.readOnly).toBe('boolean');
    }

    if (result?.priorProbability) {
      expect(['null', 'number']).toContain(typeof result.priorProbability);

      if (typeof result.priorProbability === 'number') {
        expect(Number.isInteger(result.priorProbability)).toBeTruthy();
        expect(result.priorProbability).toBeGreaterThanOrEqual(0);
        expect(result.priorProbability).toBeLessThanOrEqual(100);
      } else {
        expect(result.priorProbability).toBeNull();
      }
    }

    if (result?.channelId) {
      expect(['null', 'number']).toContain(typeof result.channelId);

      if (typeof result.channelId === 'number') {
        expect(Number.isInteger(result.channelId)).toBeTruthy();
      } else {
        expect(result.channelId).toBeNull();
      }
    }

    if (result?.externalId) {
      expect(['null', 'string']).toContain(typeof result.externalId);

      if (typeof result.externalId !== 'string') {
        expect(result.channelId).toBeNull();
      }
    }

    if (result?.tags) {
      expect(Array.isArray(result.tags)).toBeTruthy();
      expect(result.tags.length).toBeGreaterThan(0);
    }

    if (result?.form) {
      expect(result.form).toHaveProperty('id');
      expect(Number.isInteger(result.form.id)).toBeTruthy();

      if (result.form?.viewModel) {
        expect(typeof result.form?.viewModel).toBe('object');
      }
    }

    if (result?.formValue) {
      expect(typeof result.formValue).toBe('object');
    }
  });

  it('handles ref correctly', () => {
    generator = new RandomObjectFromJSONSchemaGenerator(schemaJSON);
    const result = generator.generate();
    expect(result).toHaveProperty('attendees');
    expect(Array.isArray(result.attendees)).toBeTruthy();

    if (result.attendees.length > 0) {
      expect(result.attendees[0]).toHaveProperty('userId');
      expect(result.attendees[0]).toHaveProperty('access');
      expect(Number.isInteger(result.attendees[0].userId)).toBeTruthy();

      expect(['view', 'modify', 'sign', 'execute']).toContain(
        result.attendees[0].access
      );

      if (result.attendees[0]?.formAccess) {
        expect(['view', 'execute', 'execute_view']).toContain(
          result.attendees[0].formAccess
        );
      }
    }
  });
});
