import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import { FormValidationSchema } from '../utils';

import Joi from 'joi';

export interface CreateUserDto {
  name: string;
  email: string;
  username: string;
  password: string;
}

const rules = {
  name: {
    required: 'Please enter your name',
    maxLength: {
      value: 70,
      message:
        'Your name can be at most 50 characters long. If your name is longer, please provide a short alias that we can address you by.',
    },
  },
  email: {
    required: 'Please enter your email address',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'The email address you entered is not valid',
    },
  },
  username: {
    required: 'Please enter a username',
    minLength: { value: 3, message: 'Your username must be at least 3 characters long' },
    maxLength: { value: 20, message: 'Your username can be at most 20 characters long' },
  },
  password: {
    required: 'Please enter a password',
    minLength: { value: 12, message: 'Your password must be at least 12 characters long' },
    maxLength: { value: 24, message: 'Your password can be at most 20 characters long' },
  },
};

export interface CreateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateUserDto;
}

export const createUserFormValidation: FormValidationSchema<CreateUserDto> = rules;

export const createUserSchema = Joi.object<CreateUserDto>({
  name: Joi.string()
    .required()
    .max(rules.name.maxLength.value)
    .messages({ 'string.required': rules.name.required, 'string.max': rules.name.maxLength.message }),
  email: Joi.string().required().pattern(rules.email.pattern.value).messages({
    'string.required': rules.email.required,
    'string.pattern.base': rules.email.pattern.message,
  }),
  username: Joi.string().required().min(rules.username.minLength.value).max(rules.username.maxLength.value).messages({
    'string.required': rules.username.required,
    'string.min': rules.username.minLength.message,
    'string.max': rules.username.maxLength.message,
  }),
  password: Joi.string().required().min(rules.password.minLength.value).max(rules.password.maxLength.value).messages({
    'string.required': rules.password.required,
    'string.min': rules.username.minLength.message,
    'string.max': rules.username.maxLength.message,
  }),
});
