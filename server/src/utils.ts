import { ValidationErrorRecord } from '@plantr/domain/responses';

export class ValidationError extends Error {
  errors: ValidationErrorRecord[];
  constructor(errors: ValidationErrorRecord[]) {
    super(
      errors.reduce((acc, v) => {
        acc += `${v.path.join('.')}: ${v.message}\n`;
        return acc;
      }, '')
    );
    this.errors = errors;
  }
}
