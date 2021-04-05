import { NextFunction, Request, Response } from 'express';
import { createValidator, ExpressJoiError } from 'express-joi-validation';

export const validator = createValidator({
  passError: true,
});

// err: any,
// req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
// res: Response<ResBody, Locals>,
// next: NextFunction,

export function isJoiError(err: unknown | ExpressJoiError): err is ExpressJoiError {
  const e = err as ExpressJoiError;
  return !!(e && e.error && e.error.isJoi);
}

export const validationErrorHandler = (
  err: unknown | ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (isJoiError(err)) {
    // we had a joi error, let's return a custom 400 json response
    res.status(400).json({
      type: err.type,
      details: err.error?.details,
      message: err.error?.toString(),
    });
  } else {
    // pass on to another error handler
    next(err);
  }
};
