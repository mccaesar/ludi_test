import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const validateRegistration = (data) => {
  const schema = {
    type: 'object',
    properties: {
      firstName: { type: 'string', minLength: 2, maxLength: 50 },
      lastName: { type: 'string', minLength: 2, maxLength: 50 },
      email: { type: 'string', format: 'email', minLength: 8, maxLength: 255 },
      password: { type: 'string', minLength: 8, maxLength: 1023 },
    },
    required: ['firstName', 'lastName', 'email', 'password'],
    additionalProperties: false,
  };
  const validate = ajv.compile(schema);
  const isValid = validate(data);
  return { isValid, error: ajv.errors };
};

export const validateLogin = (data) => {
  const schema = {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email', minLength: 6, maxLength: 255 },
      password: { type: 'string', minLength: 6, maxLength: 1023 },
    },
    required: ['email', 'password'],
    additionalProperties: false,
  };
  const validate = ajv.compile(schema);
  const isValid = validate(data);
  return { isValid, error: ajv.errors };
};
