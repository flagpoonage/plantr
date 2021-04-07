import { IRouter } from 'express';
import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { createSessionSchema, CreateSessionSchema } from '@plantr/domain';
import { validator } from '../middleware';
import { createSessionFromLogin } from './create';

export function addSessionRoutes(app: IRouter): void {
  app.post(
    '/sessions',
    validator.body(createSessionSchema),
    async function (req: ValidatedRequest<CreateSessionSchema>, res: Response): Promise<void> {
      const session = await createSessionFromLogin(req.body.username, req.body.password);

      if (!session) {
        res.status(401).send({ message: 'Invalid username or password' });
        return;
      }

      res.send({ message: 'Session created', data: session });
    }
  );
}
