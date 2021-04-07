import { ErrorOption } from 'react-hook-form';

export interface ValidationErrorRecord {
  path: string[];
  message: string;
}

export interface ErrorResponse {
  errors: ValidationErrorRecord[];
  message?: string;
}

export function errorResponseToFormValidation(response: ErrorResponse): [string, ErrorOption][] {
  return response.errors.map((e) => {
    return [
      e.path.join('.'),
      {
        type: 'server',
        message: e.message,
      },
    ];
  });
}
