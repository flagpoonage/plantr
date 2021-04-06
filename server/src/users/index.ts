import { CreateUserSchema, createUserSchema } from '@plantr/domain';
import { IRouter, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { ExistingUserError } from '../db/credentials';
import { validator } from '../middleware';
import { createSessionFromUser } from '../sessions/create';
import { createUser } from './create';

export function addUserRoutes(app: IRouter): void {
  app.post(
    '/users',
    validator.body(createUserSchema),
    async function (req: ValidatedRequest<CreateUserSchema>, res: Response): Promise<void> {
      try {
        const user = createUser(req.body);
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
          res.send(400).send({
            message: 'A user with this email or username already exists',
          });
        } else {
          res.send(500).send({
            message: error.message,
          });
        }
      }
    }
  );
}
