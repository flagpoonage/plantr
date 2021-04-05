import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import { FormValidationSchema } from '../utils';

import Joi from 'joi';

export interface CreateSessionDto {
  username: string;
  password: string;
}

const rules = {
  username: {
    required: 'Please enter your username',
  },
  password: {
    required: 'Please enter your password',
  },
};

export interface CreateSessionSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateSessionDto;
}

export const createSessionFormValidation: FormValidationSchema<CreateSessionDto> = rules;

export const createSessionSchema = Joi.object<CreateSessionDto>({
  username: Joi.string().messages({
    'string.required': rules.username.required,
  }),
  password: Joi.string().messages({
    'string.required': rules.password.required,
  }),
});
