import { RegisterOptions } from 'react-hook-form';

export type FormValidationSchema<T> = Record<keyof T, RegisterOptions<T>>;
