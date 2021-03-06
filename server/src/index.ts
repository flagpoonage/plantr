import express from 'express';
import { config as dotenv } from 'dotenv';
import * as path from 'path';

dotenv({
  path: path.resolve('../.env'),
});

import { addUserRoutes } from './users/index';
import { configureJwt, encode, validationErrorHandler } from './middleware';
import cors from 'cors';
import { addSessionRoutes } from './sessions';
import { Users } from './db/users';
import { Credentials } from './db/credentials';

(async () => {
  await configureJwt();
  await Users.load();
  await Credentials.load();

  const app = express();
  const port = process.env.SRV_PORT;

  app.use(express.json());
  app.use(cors());

  addUserRoutes(app);
  addSessionRoutes(app);

  app.use(validationErrorHandler);

  app.post('/jwt', async (req, res) => {
    const token = await encode(req.body);
    res.send({ token });
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
