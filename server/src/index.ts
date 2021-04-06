import express from 'express';
import { config as dotenv } from 'dotenv';
import * as path from 'path';
import { addUserRoutes } from './users/index';
import { configureJwt, encode, validationErrorHandler } from './middleware';
import cors from 'cors';
import { addSessionRoutes } from './sessions';

dotenv({
  path: path.resolve('../.env'),
});

(async () => {
  await configureJwt();

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
