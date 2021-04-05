import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { CreateUserSchema, createUserSchema } from '@plantr/domain';
import { IRouter } from 'express-serve-static-core';
import { validator } from '../middleware';

export function createUser(req: ValidatedRequest<CreateUserSchema>, res: Response): void {
  console.log('Validated successfully', req.body);
  res.send({ message: 'User created' });
}

export function addCreateUserRoute(app: IRouter): void {
  console.log('schema', createUserSchema);

  app.post('/users', validator.body(createUserSchema), createUser);
}
