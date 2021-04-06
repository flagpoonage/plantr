import { NextFunction, Request, Response } from 'express';
import { createValidator, ExpressJoiError } from 'express-joi-validation';
import * as jose from 'node-jose';

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
      errors: err.error?.details.map((a) => {
        return {
          path: a.path,
          message: a.message,
        };
      }),
    });
  } else {
    // pass on to another error handler
    next(err);
  }
};

export type JWTokenPayload = Record<string, string | number | boolean>;

interface JWTokenDecodeFailed {
  success: false;
  error: any;
}
interface JWTokenDecodeSuccess {
  success: true;
  result: JWTokenPayload;
}

export type JWTokenDecodeResult = JWTokenDecodeFailed | JWTokenDecodeSuccess;

function createEncoder(signingKey: jose.JWK.Key) {
  return async (input: JWTokenPayload): Promise<string | null> => {
    try {
      const iat = Math.floor(new Date().getTime() / 1000);
      const exp = iat + 60 * 15;
      const signer = jose.JWS.createSign({ format: 'compact' }, signingKey);
      const token = await signer.update(JSON.stringify({ ...input, iat, exp }), 'utf8').final();

      // Should actually be a string here...
      return (token as unknown) as string;
    } catch (error) {
      console.error('Unable to create JWT', error);
      return null;
    }
  };
}

function createDecoder(signingKey: jose.JWK.Key) {
  return async (input: string): Promise<JWTokenDecodeResult> => {
    try {
      const verifier = jose.JWS.createVerify(signingKey);
      const token = await verifier.verify(input);
      return {
        success: true,
        result: JSON.parse(token.payload.toString('utf-8')),
      };
    } catch (error) {
      console.error('Unable to decode JWT', error);
      return {
        success: false,
        error,
      };
    }
  };
}

let encoder: (payload: JWTokenPayload) => Promise<string | null>;
let decoder: (input: string) => Promise<JWTokenDecodeResult>;

export async function configureJwt(): Promise<void> {
  const SigningKey = await jose.JWK.asKey(process.env.PRIVATE_KEY as string, 'pem');

  encoder = createEncoder(SigningKey);
  decoder = createDecoder(SigningKey);
}

export const decode = (input: string): Promise<JWTokenDecodeResult> => decoder(input);
export const encode = (payload: JWTokenPayload): Promise<string | null> => encoder(payload);
