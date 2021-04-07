import { CreateUserSchema, createUserSchema, ValidationErrorRecord } from '@plantr/domain';
import { IRouter, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { ExistingUserError } from '../db/credentials';
import { Users } from '../db/users';
import { validator } from '../middleware';
import { createSessionFromUser } from '../sessions/create';
import { createUser } from './create';

export function addUserRoutes(app: IRouter): void {
  app.post(
    '/users',
    validator.body(createUserSchema),
    async function (req: ValidatedRequest<CreateUserSchema>, res: Response): Promise<void> {
      const errors: ValidationErrorRecord[] = [];

      if (Users.find((a) => a.username === req.body.username)) {
        errors.push({
          path: ['username'],
          message: 'This username is already in use',
        });
      }

      if (Users.find((a) => a.email === req.body.email)) {
        errors.push({
          path: ['email'],
          message: 'This email address is already in use',
        });
      }

      if (errors.length > 0) {
        res.status(400).send({
          errors,
        });
        return;
      }

      try {
        const user = await createUser(req.body);
        const session = await createSessionFromUser(user);

        res.status(201).send({
          message: 'User created',
          data: {
            user,
            session,
          },
        });
      } catch (error) {
        if (error instanceof ExistingUserError) {
          res.status(400).send({
            message: 'A user with this email or username already exists',
          });
        } else {
          res.status(500).send({
            message: error.message,
          });
        }
      }
    }
  );
}
